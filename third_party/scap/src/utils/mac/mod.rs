use core_graphics_helmer_fork::access::ScreenCaptureAccess;
use sysinfo::System;

pub fn has_permission() -> bool {
    ScreenCaptureAccess.preflight()
}

pub fn request_permission() -> bool {
    ScreenCaptureAccess.request()
}

pub fn is_supported() -> bool {
    // Audio capture requires macOS 13. Compare numerically (not lexicographically).
    System::os_version().and_then(|v| v.split('.').next()?.parse::<u32>().ok()).is_some_and(|v| v >= 13)
}
