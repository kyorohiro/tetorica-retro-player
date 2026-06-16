package net.tetorica.retro_player

import android.app.ProgressDialog
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.GeolocationPermissions
import android.webkit.JsPromptResult
import android.webkit.JsResult
import android.webkit.PermissionRequest
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.os.Handler
import android.os.Looper
import androidx.activity.enableEdgeToEdge
import java.io.File
import java.io.IOException

class MainActivity : TauriActivity() {
    private var webViewRef: WebView? = null

    private lateinit var rustClient: RustWebChromeClient

    override fun onCreate(savedInstanceState: Bundle?) {
        // Create before super.onCreate() so registerForActivityResult is called
        // while the Activity is in INITIALIZED state (must be before STARTED).
        rustClient = RustWebChromeClient(this)
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
    }

    override fun onWebViewCreate(webView: WebView) {
        super.onWebViewCreate(webView)
        webViewRef = webView
        // Post to main looper so our client is set AFTER Rust calls
        // setWebChromeClient(RustWebChromeClient) — which happens after
        // setWebView() returns in main_pipe.rs CreateWebView handling.
        Handler(Looper.getMainLooper()).post {
        webView.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(
                webView: WebView,
                filePathCallback: ValueCallback<Array<Uri?>?>,
                fileChooserParams: FileChooserParams
            ): Boolean {
                val wrappedCallback = ValueCallback<Array<Uri?>?> { uris ->
                    if (uris.isNullOrEmpty()) {
                        filePathCallback.onReceiveValue(null)
                        return@ValueCallback
                    }
                    val firstUri = uris[0] ?: run {
                        filePathCallback.onReceiveValue(uris)
                        return@ValueCallback
                    }
                    val mime = contentResolver.getType(firstUri) ?: ""
                    if (mime.startsWith("video/") || mime.startsWith("audio/")) {
                        filePathCallback.onReceiveValue(null)
                        nativeCacheAndNotify(firstUri, mime)
                    } else {
                        filePathCallback.onReceiveValue(uris)
                    }
                }
                return rustClient.onShowFileChooser(webView, wrappedCallback, fileChooserParams)
            }

            override fun onPermissionRequest(request: PermissionRequest) =
                rustClient.onPermissionRequest(request)

            override fun onShowCustomView(view: View, callback: CustomViewCallback) =
                rustClient.onShowCustomView(view, callback)

            override fun onHideCustomView() = rustClient.onHideCustomView()

            override fun onJsAlert(
                view: WebView, url: String, message: String, result: JsResult
            ): Boolean = rustClient.onJsAlert(view, url, message, result)

            override fun onJsConfirm(
                view: WebView, url: String, message: String, result: JsResult
            ): Boolean = rustClient.onJsConfirm(view, url, message, result)

            override fun onJsPrompt(
                view: WebView, url: String, message: String,
                defaultValue: String, result: JsPromptResult
            ): Boolean = rustClient.onJsPrompt(view, url, message, defaultValue, result)

            override fun onGeolocationPermissionsShowPrompt(
                origin: String, callback: GeolocationPermissions.Callback
            ) = rustClient.onGeolocationPermissionsShowPrompt(origin, callback)

            override fun onConsoleMessage(consoleMessage: ConsoleMessage): Boolean =
                rustClient.onConsoleMessage(consoleMessage)

            override fun onReceivedTitle(view: WebView, title: String) =
                rustClient.onReceivedTitle(view, title)
        }
        } // Handler.post
    }

    @Suppress("DEPRECATION")
    private fun nativeCacheAndNotify(uri: Uri, mime: String) {
        val dialog = ProgressDialog(this).apply {
            setMessage("読み込み中...")
            isIndeterminate = true
            setCancelable(false)
        }
        runOnUiThread { dialog.show() }

        Thread {
            try {
                val displayName = contentResolver.query(
                    uri, arrayOf(OpenableColumns.DISPLAY_NAME), null, null, null
                )?.use { cursor ->
                    if (cursor.moveToFirst()) cursor.getString(0) else null
                } ?: "file_${System.currentTimeMillis()}"

                val outDir = File(cacheDir, "video-cache").apply { mkdirs() }
                val safeName = displayName.replace(Regex("[^a-zA-Z0-9._-]"), "_")
                val outFile = File(outDir, "${System.currentTimeMillis()}-$safeName")

                val t0 = System.currentTimeMillis()
                android.util.Log.d("GDRIVE_OBSERVE", "openInputStream uri=$uri")

                val inputStream = contentResolver.openInputStream(uri)
                    ?: throw IOException("Cannot open stream")

                android.util.Log.d("GDRIVE_OBSERVE", "stream opened after ${System.currentTimeMillis() - t0}ms")

                var totalBytes = 0L
                val buf = ByteArray(256 * 1024)
                inputStream.use { input ->
                    outFile.outputStream().use { output ->
                        var n: Int
                        while (input.read(buf).also { n = it } != -1) {
                            output.write(buf, 0, n)
                            totalBytes += n
                        }
                    }
                }

                android.util.Log.d("GDRIVE_OBSERVE", "done ${totalBytes}B in ${System.currentTimeMillis() - t0}ms")

                val path = outFile.absolutePath.replace("\\", "\\\\").replace("'", "\\'")
                val name = displayName.replace("\\", "\\\\").replace("'", "\\'")
                val mimeEsc = mime.replace("'", "\\'")

                runOnUiThread {
                    dialog.dismiss()
                    webViewRef?.evaluateJavascript(
                        "window.__onNativeFileCached&&window.__onNativeFileCached('$path','$name','$mimeEsc')",
                        null
                    )
                }
            } catch (e: Exception) {
                android.util.Log.e("GDRIVE_OBSERVE", "error: ${e.message}")
                val msg = (e.message ?: "unknown error").replace("'", "\\'")
                runOnUiThread {
                    dialog.dismiss()
                    webViewRef?.evaluateJavascript(
                        "window.__onNativeFileCacheError&&window.__onNativeFileCacheError('$msg')",
                        null
                    )
                }
            }
        }.start()
    }
}
