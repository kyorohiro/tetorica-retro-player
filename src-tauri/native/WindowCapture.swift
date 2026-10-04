import AppKit
import ScreenCaptureKit
import AVFoundation
import CoreImage

// Binary packets: 0=status UTF-8, 1=JPEG, 2=LE rate/channels + interleaved f32,
// 3=end/error UTF-8. Rust copies the bytes before this callback returns.
typealias PacketCallback = @convention(c) (UnsafePointer<UInt8>?, Int, UnsafeMutableRawPointer?) -> Void
typealias ReleaseCallback = @convention(c) (UnsafeMutableRawPointer?) -> Void
private var currentCapture: AnyObject?

@available(macOS 14.0, *)
private final class WindowCapture: NSObject, SCContentSharingPickerObserver, SCStreamOutput, SCStreamDelegate {
    let callback: PacketCallback
    let release: ReleaseCallback
    let context: UnsafeMutableRawPointer?
    let queue = DispatchQueue(label: "net.tetorica.native-capture")
    let imageContext = CIContext(options: [.cacheIntermediates: false])
    var stream: SCStream?
    var stopping = false
    // Accessed only on the serial sample queue.
    var outputEnded = false

    init(_ callback: @escaping PacketCallback, _ release: @escaping ReleaseCallback, _ context: UnsafeMutableRawPointer?) {
        self.callback = callback
        self.release = release
        self.context = context
    }
    deinit { release(context) }

    func send(_ kind: UInt8, _ payload: Data = Data()) {
        var packet = Data([kind])
        packet.append(payload)
        packet.withUnsafeBytes { bytes in
            callback(bytes.bindMemory(to: UInt8.self).baseAddress, packet.count, context)
        }
    }

    func present() {
        let picker = SCContentSharingPicker.shared
        var config = SCContentSharingPickerConfiguration()
        config.allowedPickerModes = [.singleWindow, .singleDisplay]
        config.allowsChangingSelectedContent = false
        picker.defaultConfiguration = config
        picker.add(self)
        picker.isActive = true
        picker.present(using: .window)
    }

    func finish(_ message: String) {
        // Serialize shutdown with sample output, so release cannot race callbacks.
        DispatchQueue.main.async { [self] in
            guard !stopping else { return }
            stopping = true
            queue.async { [self] in outputEnded = true }
            SCContentSharingPicker.shared.remove(self)
            SCContentSharingPicker.shared.isActive = false
            let complete = { [self] in
                queue.async { [self] in
                    send(3, Data(message.utf8))
                    DispatchQueue.main.async { [self] in
                        if currentCapture === self { currentCapture = nil }
                        stream = nil
                    }
                }
            }
            if let stream = stream { stream.stopCapture { _ in complete() } }
            else { complete() }
        }
    }

    func contentSharingPicker(_ picker: SCContentSharingPicker, didCancelFor stream: SCStream?) {
        if self.stream == nil { finish("Capture cancelled.") }
    }
    func contentSharingPickerStartDidFailWithError(_ error: Error) { finish(error.localizedDescription) }
    func contentSharingPicker(_ picker: SCContentSharingPicker, didUpdateWith filter: SCContentFilter, for stream: SCStream?) {
        DispatchQueue.main.async { [self] in
            guard !stopping, self.stream == nil else { return }
            let config = SCStreamConfiguration()
            let rect = filter.contentRect
            let scale = min(1.0, 1280.0 / max(rect.width, rect.height, 1))
            config.width = max(2, Int(rect.width * scale))
            config.height = max(2, Int(rect.height * scale))
            config.minimumFrameInterval = CMTime(value: 1, timescale: 30)
            config.queueDepth = 3
            config.pixelFormat = kCVPixelFormatType_32BGRA
            config.capturesAudio = true
            config.excludesCurrentProcessAudio = true
            config.sampleRate = 48000
            config.channelCount = 2
            let capture = SCStream(filter: filter, configuration: config, delegate: self)
            do {
                try capture.addStreamOutput(self, type: .screen, sampleHandlerQueue: queue)
                try capture.addStreamOutput(self, type: .audio, sampleHandlerQueue: queue)
                self.stream = capture
                capture.startCapture { [self] error in
                    if let error = error { finish(error.localizedDescription) }
                    else { queue.async { [self] in if !outputEnded { send(0, Data("started".utf8)) } } }
                }
            } catch { finish(error.localizedDescription) }
        }
    }
    func stream(_ stream: SCStream, didStopWithError error: Error) { finish(error.localizedDescription) }
    func stream(_ stream: SCStream, didOutputSampleBuffer sample: CMSampleBuffer, of type: SCStreamOutputType) {
        guard !outputEnded, sample.isValid else { return }
        if type == .screen {
            guard let attachments = CMSampleBufferGetSampleAttachmentsArray(sample, createIfNecessary: false) as? [[SCStreamFrameInfo: Any]],
                  let status = attachments.first?[.status] as? Int,
                  status == SCFrameStatus.complete.rawValue,
                  let pixelBuffer = sample.imageBuffer else { return }
            let image = CIImage(cvPixelBuffer: pixelBuffer)
            if let jpeg = imageContext.jpegRepresentation(of: image, colorSpace: CGColorSpaceCreateDeviceRGB(), options: [CIImageRepresentationOption(rawValue: kCGImageDestinationLossyCompressionQuality as String): 0.85]) {
                send(1, jpeg)
            }
        } else if type == .audio {
            guard let description = sample.formatDescription else { return }
            let format = AVAudioFormat(cmAudioFormatDescription: description)
            guard format.commonFormat == .pcmFormatFloat32 else { return }
            var needed = 0
            var block: CMBlockBuffer?
            guard CMSampleBufferGetAudioBufferListWithRetainedBlockBuffer(sample, bufferListSizeNeededOut: &needed, bufferListOut: nil, bufferListSize: 0, blockBufferAllocator: nil, blockBufferMemoryAllocator: nil, flags: 0, blockBufferOut: &block) == noErr else { return }
            let storage = UnsafeMutableRawPointer.allocate(byteCount: needed, alignment: MemoryLayout<AudioBufferList>.alignment)
            defer { storage.deallocate() }
            let list = storage.bindMemory(to: AudioBufferList.self, capacity: 1)
            guard CMSampleBufferGetAudioBufferListWithRetainedBlockBuffer(sample, bufferListSizeNeededOut: nil, bufferListOut: list, bufferListSize: needed, blockBufferAllocator: nil, blockBufferMemoryAllocator: nil, flags: 0, blockBufferOut: &block) == noErr else { return }
            let buffers = UnsafeMutableAudioBufferListPointer(list)
            let frames = CMSampleBufferGetNumSamples(sample)
            let channels = Int(format.channelCount)
            guard frames > 0, channels > 0, channels <= 2 else { return }
            var samples = [Float](repeating: 0, count: frames * channels)
            for channel in 0..<channels {
                let buffer = buffers[format.isInterleaved ? 0 : channel]
                guard let data = buffer.mData else { return }
                let source = data.assumingMemoryBound(to: Float.self)
                for frame in 0..<frames { samples[frame * channels + channel] = source[format.isInterleaved ? frame * channels + channel : frame] }
            }
            var rate = UInt32(format.sampleRate).littleEndian
            var count = UInt32(channels).littleEndian
            var payload = Data(bytes: &rate, count: 4)
            payload.append(Data(bytes: &count, count: 4))
            samples.withUnsafeBytes { payload.append(contentsOf: $0) }
            send(2, payload)
        }
    }
}

@_cdecl("retro_capture_available")
func retroCaptureAvailable() -> Bool {
    if #available(macOS 14.0, *) { return true }
    return false
}

@_cdecl("retro_capture_start")
func retroCaptureStart(_ callback: @escaping PacketCallback, _ release: @escaping ReleaseCallback, _ context: UnsafeMutableRawPointer?) {
    if #available(macOS 14.0, *) {
        let capture = WindowCapture(callback, release, context)
        currentCapture = capture
        capture.present()
    } else { release(context) }
}

@_cdecl("retro_capture_stop")
func retroCaptureStop() {
    if #available(macOS 14.0, *), let capture = currentCapture as? WindowCapture { capture.finish("Capture stopped.") }
}
