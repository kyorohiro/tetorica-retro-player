#!/usr/bin/env swift
//
// create-virtual-display.swift  v4
//
// 【PoC 結果 2026-06-17】
// - Descriptor, Mode 初期化: 成功
// - initWithDescriptor: → nil  (kr=0x5 KERN_FAILURE)
//   WindowServer が Mach IPC で接続を拒否する。
//   private entitlement (com.apple.private.iokit.displayservice など) が必要だが、
//   ad-hoc 署名で付与すると AMFI が SIGKILL する。
//   → 第三者アプリには使用不可。Sidecar など Apple 内部サービスのみ利用可能。
//
// 全 setter を IMP unsafeBitCast で直接呼ぶ方式。Protocol cast を使わない。
//
// コンパイル & 実行:
//   swiftc create-virtual-display.swift -o /tmp/vdisplay && /tmp/vdisplay

import Foundation
import CoreGraphics
import ObjectiveC

// MARK: - IMP helpers (concrete types only — @convention(c) は generic 不可)

func getIMP(_ cls: AnyClass, _ sel: Selector) -> IMP {
    return method_getImplementation(class_getInstanceMethod(cls, sel)!)
}

func callObj(_ obj: AnyObject, _ sel: Selector) -> AnyObject? {
    typealias Fn = @convention(c) (AnyObject, Selector) -> AnyObject?
    return unsafeBitCast(getIMP(type(of: obj), sel), to: Fn.self)(obj, sel)
}

func setObjArg(_ obj: AnyObject, _ sel: Selector, _ val: AnyObject?) {
    typealias Fn = @convention(c) (AnyObject, Selector, AnyObject?) -> Void
    unsafeBitCast(getIMP(type(of: obj), sel), to: Fn.self)(obj, sel, val)
}

func setCGSizeArg(_ obj: AnyObject, _ sel: Selector, _ val: CGSize) {
    typealias Fn = @convention(c) (AnyObject, Selector, CGSize) -> Void
    unsafeBitCast(getIMP(type(of: obj), sel), to: Fn.self)(obj, sel, val)
}

func setCGPointArg(_ obj: AnyObject, _ sel: Selector, _ val: CGPoint) {
    typealias Fn = @convention(c) (AnyObject, Selector, CGPoint) -> Void
    unsafeBitCast(getIMP(type(of: obj), sel), to: Fn.self)(obj, sel, val)
}

func setUInt32Arg(_ obj: AnyObject, _ sel: Selector, _ val: UInt32) {
    typealias Fn = @convention(c) (AnyObject, Selector, UInt32) -> Void
    unsafeBitCast(getIMP(type(of: obj), sel), to: Fn.self)(obj, sel, val)
}

func setBoolArg(_ obj: AnyObject, _ sel: Selector, _ val: Bool) {
    typealias Fn = @convention(c) (AnyObject, Selector, Bool) -> Void
    unsafeBitCast(getIMP(type(of: obj), sel), to: Fn.self)(obj, sel, val)
}

// MARK: - Runtime class loading

guard
    let DescriptorCls = NSClassFromString("CGVirtualDisplayDescriptor"),
    let ModeCls       = NSClassFromString("CGVirtualDisplayMode"),
    let SettingsCls   = NSClassFromString("CGVirtualDisplaySettings"),
    let DisplayCls    = NSClassFromString("CGVirtualDisplay")
else {
    print("❌ CGVirtualDisplay API not available on this macOS version")
    exit(1)
}
print("✅ API available — macOS \(ProcessInfo.processInfo.operatingSystemVersionString)")

func allocObj(_ cls: AnyClass) -> AnyObject {
    typealias AllocFn = @convention(c) (AnyClass, Selector) -> AnyObject
    let sel = NSSelectorFromString("alloc")
    let imp = method_getImplementation(class_getClassMethod(cls, sel)!)
    return unsafeBitCast(imp, to: AllocFn.self)(cls, sel)
}

func callInit(_ obj: AnyObject) -> AnyObject {
    typealias InitFn = @convention(c) (AnyObject, Selector) -> AnyObject
    let sel = NSSelectorFromString("init")
    let imp = getIMP(type(of: obj), sel)
    return unsafeBitCast(imp, to: InitFn.self)(obj, sel)
}

// MARK: - Descriptor

let desc = callInit(allocObj(DescriptorCls))

setObjArg  (desc, NSSelectorFromString("setName:"),           "RetroPlayer Virtual" as AnyObject)
setUInt32Arg(desc, NSSelectorFromString("setMaxPixelsWide:"), 1920)
setUInt32Arg(desc, NSSelectorFromString("setMaxPixelsHigh:"), 1080)

let physicalSize = CGSize(width: Double(1920) * 25.4 / 96.0, height: Double(1080) * 25.4 / 96.0)
setCGSizeArg(desc, NSSelectorFromString("setSizeInMillimeters:"), physicalSize)

setObjArg(desc, NSSelectorFromString("setQueue:"), DispatchQueue.main)

setCGPointArg(desc, NSSelectorFromString("setRedPrimary:"),   CGPoint(x: 0.680, y: 0.320))
setCGPointArg(desc, NSSelectorFromString("setGreenPrimary:"), CGPoint(x: 0.265, y: 0.690))
setCGPointArg(desc, NSSelectorFromString("setBluePrimary:"),  CGPoint(x: 0.150, y: 0.060))
setCGPointArg(desc, NSSelectorFromString("setWhitePoint:"),   CGPoint(x: 0.3127, y: 0.3290))

let block: @convention(block) () -> Void = { print("⚠️  Virtual display terminated") }
setObjArg(desc, NSSelectorFromString("setTerminationHandler:"), block as AnyObject)

let nameVal = desc.value(forKey: "name") ?? "nil"
let wVal    = desc.value(forKey: "maxPixelsWide") ?? "nil"
print("descriptor.name=\(nameVal)  maxPixelsWide=\(wVal)")

// MARK: - Mode  (initWithWidth:height:refreshRate:)

typealias InitWHR = @convention(c) (AnyObject, Selector, UInt32, UInt32, UInt32) -> AnyObject
let modeAlloc = allocObj(ModeCls)
let whrSel = NSSelectorFromString("initWithWidth:height:refreshRate:")
let whrIMP = getIMP(ModeCls, whrSel)
let mode = unsafeBitCast(whrIMP, to: InitWHR.self)(modeAlloc, whrSel, 1920, 1080, 60)
print("mode: \(mode)")

// MARK: - Settings

let settings = callInit(allocObj(SettingsCls))
setObjArg(settings, NSSelectorFromString("setModes:"), [mode] as AnyObject)
setBoolArg(settings, NSSelectorFromString("setHiDPI:"), false)

// MARK: - Virtual Display

let dispAlloc = allocObj(DisplayCls)
let initDescSel = NSSelectorFromString("initWithDescriptor:")
typealias InitDescFn = @convention(c) (AnyObject, Selector, AnyObject) -> AnyObject?
let initDescIMP = getIMP(DisplayCls, initDescSel)
guard let display = unsafeBitCast(initDescIMP, to: InitDescFn.self)(dispAlloc, initDescSel, desc) else {
    print("❌ initWithDescriptor: returned nil")
    print("   macOS 15 では com.apple.developer.corewifi.manager などの private entitlement が必要な可能性があります")
    print("   → codesign で entitlements.plist を付与して再試行してください")
    exit(1)
}

print("✅ CGVirtualDisplay created!")

// Apply settings
typealias ApplyFn = @convention(c) (AnyObject, Selector, AnyObject) -> Bool
let applySel = NSSelectorFromString("applySettings:")
let applyIMP = getIMP(DisplayCls, applySel)
let ok = unsafeBitCast(applyIMP, to: ApplyFn.self)(display, applySel, settings)

// Read displayID
typealias GetIDFn = @convention(c) (AnyObject, Selector) -> CGDirectDisplayID
let idSel = NSSelectorFromString("displayID")
let idIMP = getIMP(DisplayCls, idSel)
let displayID = unsafeBitCast(idIMP, to: GetIDFn.self)(display, idSel)

print("applySettings: \(ok)  displayID: \(displayID)")
print("")
print("👉 tetorica-retro-player → Capture を開いて 'RetroPlayer Virtual' が表示されるか確認してください")
print("   Ctrl+C で仮想ディスプレイを破棄します")

withExtendedLifetime(display) { RunLoop.main.run() }
