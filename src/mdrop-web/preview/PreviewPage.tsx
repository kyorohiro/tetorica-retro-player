import React from "react";
import type { RetroPreviewLayoutState } from "../../retro-player/previewLayoutState";
import type { TargetFile } from "../api";
import {
    heicToObjectUrl,
    isArchive,
    isAudio,
    isEpub,
    isHeic,
    isImage,
    isPdf,
    isText,
    isVideo,
    isVideoExtended,
    makeBlobFromUrl,
} from "../utils";
import { useZipFileListDialog } from "../useZipFileListDialog";
import { downloadUrl } from "../usePreviewDialog";

const loadRetroPlayer = () => import("../../retro-player/components/RetroPlayer");
const loadReactReader = () =>
    import("react-reader").then((module) => ({ default: module.ReactReader }));
const loadPdfPreview = () => import("./PdfPreview");

const RetroPlayer = React.lazy(loadRetroPlayer);
const ReactReader = React.lazy(loadReactReader);
const PdfPreview = React.lazy(loadPdfPreview);

type PreviewPageStatus = "none" | "loading" | "loaded" | "error";
type PreviewCacheEntry =
    | { kind: "src"; src: string; revokeOnEvict: boolean }
    | { kind: "text"; src: string; text: string; revokeOnEvict: boolean };

const PREVIEW_CACHE_LIMIT = 6;
const previewCache = new Map<string, PreviewCacheEntry>();

const getPreviewCacheKey = (
    file: TargetFile,
    apiServer: string,
    useHls: boolean,
    forcedKind?: "audio" | "video" | "image",
) => `${apiServer}|${useHls ? "hls" : "direct"}|${forcedKind ?? "auto"}|${file.id}|${file.path}`;

const getCachedPreview = (key: string): PreviewCacheEntry | undefined => {
    const cached = previewCache.get(key);
    if (!cached) return undefined;
    previewCache.delete(key);
    previewCache.set(key, cached);
    return cached;
};

const setCachedPreview = (key: string, entry: PreviewCacheEntry) => {
    if (previewCache.has(key)) {
        const current = previewCache.get(key);
        if (current?.revokeOnEvict && current.src !== entry.src) {
            URL.revokeObjectURL(current.src);
        }
        previewCache.delete(key);
    }
    previewCache.set(key, entry);
    while (previewCache.size > PREVIEW_CACHE_LIMIT) {
        const oldestKey = previewCache.keys().next().value;
        if (!oldestKey) break;
        const oldest = previewCache.get(oldestKey);
        if (oldest?.revokeOnEvict) {
            URL.revokeObjectURL(oldest.src);
        }
        previewCache.delete(oldestKey);
    }
};

export type PreviewPageProps = {
    file: TargetFile;
    isRetro?: boolean;
    useHls?: boolean;
    forcedKind?: "audio" | "video" | "image";
    apiServer?: string;
    coverSrc?: string;
    getObjectUrl?: (
        file: TargetFile,
        onProgress?: (loaded: number, total: number) => void
    ) => Promise<string>;
    onLoadingMessage?: (message: string) => void;
    previewLayoutState?: RetroPreviewLayoutState;
    onPreviewLayoutStateChange?: (state: RetroPreviewLayoutState) => void;
};

export function PreviewPage({
    file,
    isRetro = false,
    useHls = false,
    forcedKind,
    apiServer = "",
    getObjectUrl,
    onLoadingMessage,
    coverSrc,
    previewLayoutState,
    onPreviewLayoutStateChange,
}: PreviewPageProps) {
    const isVideoHere =
        forcedKind === "video"
            ? (useHls ? isVideoExtended(file.path) : isVideo(file.path))
            : forcedKind === "audio"
                ? false
                : useHls
                    ? isVideoExtended(file.path)
                    : isVideo(file.path);
    const resolvedKind =
        forcedKind ??
        (isVideoHere
            ? "video"
            : isAudio(file.path)
                ? "audio"
                : "image");
    const [status, setStatus] = React.useState<PreviewPageStatus>("none");
    const [src, setSrc] = React.useState("");
    const [text, setText] = React.useState("");
    const [error, setError] = React.useState("");
    const [epubLocation, setEpubLocation] = React.useState<string | number>(0);
    const renditionRef = React.useRef<any>(null);
    const cacheKey = React.useMemo(
        () => getPreviewCacheKey(file, apiServer, useHls, forcedKind),
        [apiServer, file, forcedKind, useHls],
    );

    const { showZipFileListDialog } = useZipFileListDialog();

    const getUrlFromTargetFile = React.useCallback(
        async (target: TargetFile) => {
            return getObjectUrl
                ? await getObjectUrl(target, (loaded, total) => {
                    onLoadingMessage?.(`${loaded}/${total}`);
                })
                : downloadUrl(apiServer, target);
        },
        [apiServer, getObjectUrl, onLoadingMessage]
    );

    React.useEffect(() => {
        let alive = true;
        const objectUrls: string[] = [];

        const addObjectUrl = (url: string) => {
            if (url.startsWith("blob:")) {
                objectUrls.push(url);
            }
        };

        const run = async () => {
            setStatus("loading");
            setSrc("");
            setText("");
            setError("");
            onLoadingMessage?.("");

            const cached = getCachedPreview(cacheKey);
            if (cached) {
                setSrc(cached.src);
                if (cached.kind === "text") {
                    setText(cached.text);
                }
                setStatus("loaded");
                return;
            }

            if (isPdf(file.path)) {
                void loadPdfPreview();
            }

            if (isEpub(file.path)) {
                void loadReactReader();
            }

            if (isRetro && (isVideoHere || isAudio(file.path) || isImage(file.path) || isHeic(file.path))) {
                void loadRetroPlayer();
            }

            const nextSrc = await getUrlFromTargetFile(file);
            addObjectUrl(nextSrc);

            if (!alive) return;

            if (isText(file.path)) {
                const resp = await fetch(nextSrc);
                if (!resp.ok) {
                    throw new Error(`Failed to load text: ${resp.status}`);
                }

                const nextText = await resp.text();
                if (!alive) return;

                setText(nextText);
                setCachedPreview(cacheKey, {
                    kind: "text",
                    src: nextSrc,
                    text: nextText,
                    revokeOnEvict: nextSrc.startsWith("blob:"),
                });
                setStatus("loaded");
                return;
            }

            if (isHeic(file.path)) {
                onLoadingMessage?.("Converting HEIC...");

                const resp = await fetch(nextSrc);
                if (!resp.ok) {
                    throw new Error(`Failed to load HEIC: ${resp.status}`);
                }

                const heicBlob = await resp.blob();
                const convertedUrl = await heicToObjectUrl(heicBlob);
                addObjectUrl(convertedUrl);

                if (!alive) return;

                setSrc(convertedUrl);
                setCachedPreview(cacheKey, {
                    kind: "src",
                    src: convertedUrl,
                    revokeOnEvict: true,
                });
                setStatus("loaded");
                onLoadingMessage?.("");
                return;
            }

            setSrc(nextSrc);
            setCachedPreview(cacheKey, {
                kind: "src",
                src: nextSrc,
                revokeOnEvict: nextSrc.startsWith("blob:"),
            });
            setStatus("loaded");
        };

        run().catch((err) => {
            console.error(err);
            if (!alive) return;

            setError(err instanceof Error ? err.message : String(err));
            setStatus("error");
            onLoadingMessage?.("Failed to load preview");
        });

        return () => {
            alive = false;
            for (const url of objectUrls) {
                if (previewCache.get(cacheKey)?.src === url) {
                    continue;
                }
                URL.revokeObjectURL(url);
            }
        };
    }, [cacheKey, file, getUrlFromTargetFile, isRetro, isVideoHere, onLoadingMessage]);

    if (status === "none" || status === "loading") {
        return <div className="text-sm text-slate-400">Loading...</div>;
    }

    if (status === "error") {
        return (
            <div className="max-w-lg px-4 text-center text-sm text-red-300">
                <div>Preview failed</div>
                <div className="mt-2 break-all text-xs text-red-400">
                    {error}
                </div>
            </div>
        );
    }

    if (isRetro && (resolvedKind === "video" || resolvedKind === "audio" || isImage(file.path) || isHeic(file.path))) {
        return (
            <div className="mx-auto w-full max-w-6xl touch-manipulation">
                <React.Suspense
                    fallback={
                        <div className="flex min-h-[220px] items-center justify-center rounded-2xl bg-slate-950/80">
                            <div className="rounded-2xl border border-slate-700 bg-slate-900/88 px-5 py-4 text-center text-sm text-slate-100 shadow-lg">
                                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400" />
                                <p className="font-medium">Preparing retro preview...</p>
                            </div>
                        </div>
                    }
                >
                    <RetroPlayer
                        src={src}
                        kind={resolvedKind}
                        looping={forcedKind === "audio" ? false : undefined}
                        autoPlay={false}
                        previewLayoutState={previewLayoutState}
                        onPreviewLayoutStateChange={onPreviewLayoutStateChange}
                        className="touch-manipulation border-0 bg-transparent p-0 shadow-none"
                    />
                </React.Suspense>
            </div>
        );
    }

    if (resolvedKind === "video") {
        return (
            <video
                src={src}
                controls
                autoPlay
                className="max-h-full max-w-full"
            />
        );
    }

    if (resolvedKind === "audio") {
        return (
            <div className="w-full max-w-2xl px-6 text-center">
                <div className="mb-4 break-all text-sm text-slate-300">
                    {file.path}
                </div>
                <audio src={src} controls autoPlay className="w-full" />
            </div>
        );
    }

    if (isImage(file.path) || isHeic(file.path)) {
        return (
            <img
                src={src}
                alt={file.path}
                className="max-h-full max-w-full object-contain"
            />
        );
    }

    if (isPdf(file.path)) {
        return (
            <React.Suspense
                fallback={
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                        Preparing PDF preview...
                    </div>
                }
            >
                <PdfPreview
                    src={src}
                    filePath={file.path}
                />
            </React.Suspense>
        );
    }

    if (isText(file.path)) {
        return (
            <pre className="h-full w-full overflow-auto whitespace-pre-wrap break-words bg-slate-950 p-4 text-left text-xs text-slate-100">
                {text}
            </pre>
        );
    }

    if (isEpub(file.path)) {
        return (
            <div className="h-full w-full bg-white text-black">
                <React.Suspense
                    fallback={
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                            Preparing EPUB reader...
                        </div>
                    }
                >
                    <ReactReader
                        epubInitOptions={{ openAs: "epub" }}
                        url={src}
                        location={epubLocation}
                        locationChanged={(nextLocation: string) => {
                            setEpubLocation(nextLocation);
                        }}
                        getRendition={(rendition) => {
                            renditionRef.current = rendition;
                        }}
                    />
                </React.Suspense>
            </div>
        );
    }
    if (isArchive(file.path)) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-sm text-slate-400">
                {coverSrc && (
                    <img
                        src={coverSrc}
                        alt="cover"
                        className="max-h-[70%] max-w-[90%] rounded-lg object-contain"
                    />
                )}

                <button
                    type="button"
                    onClick={async () => {
                        const f = await getUrlFromTargetFile(file);
                        try {
                            await showZipFileListDialog({
                                initialPath: "/",
                                title: file.path,
                                source: {
                                    type: "blob",
                                    blob: await makeBlobFromUrl(f),
                                },
                            });
                        } finally {
                            if (f.startsWith("blob:")) {
                                URL.revokeObjectURL(f);
                            }
                        }
                    }}
                    className="rounded-lg border border-slate-700 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800"
                >
                    OPEN
                </button>
            </div>
        );
    }

    return <div className="text-sm text-slate-400">Preview not supported</div>;
}
