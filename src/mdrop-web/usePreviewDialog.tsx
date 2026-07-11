import React, { useState } from "react";
import { X } from "lucide-react";
import { useDialog } from "../useDialog";
import { primeImageElementCache } from "../retro-player/media/RetroMediaSource";
import {
    areRetroPreviewLayoutStatesEqual,
    normalizeRetroPreviewLayoutState,
    type RetroPreviewLayoutState,
} from "../retro-player/previewLayoutState";
import type { TargetFile } from "./api";
import { PreviewPage } from "./preview/PreviewPage";
import {
    getPreviewDialogCacheKey,
    PreviewDialogCache,
    shouldWarmPreviewDialogFile,
} from "./preview/previewDialogCache";
import { preivewGlobalSetting } from "./preview/preivewSetting";
import { isHeic, isImage } from "./utils";

const RETRO_PREVIEW_DIALOG_EVENT = "tetorica-retro-preview-dialog-active";

const primeBrowserImageCache = async (url: string): Promise<void> => {
    if (typeof Image === "undefined") {
        return;
    }

    const image = new Image();
    image.decoding = "async";
    image.src = url;

    if (image.complete && image.naturalWidth > 0) {
        return;
    }

    if (typeof image.decode === "function") {
        try {
            await image.decode();
            return;
        } catch {
            // Fall through to onload because some browsers reject decode for blob timing.
        }
    }

    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Failed to preload image: ${url}`));
    });
};

type PreviewDialogOptions = {
    files: TargetFile[];
    initialIndex: number;
    isRetro?: boolean;
    useHls?: boolean;
    forcedKind?: "audio" | "video" | "image";
    apiServer?: string;
    coverSrc?: string;
    getObjectUrl?: (
        file: TargetFile,
        onProgress?: (loaded: number, total: number) => void
    ) => Promise<string>;
    download?: (
        file: TargetFile,
        onProgress?: (loaded: number, total: number) => void
    ) => Promise<void>;
    isClose?: boolean;
};

export const downloadUrl = (apiServer: string, file: TargetFile): string => {
    const encodePath = (path: string) =>
        path
            .split("/")
            .map((part) =>
                encodeURIComponent(part)
                    .replace(/\[/g, "%5B")
                    .replace(/\]/g, "%5D")
            )
            .join("/");

    return `${apiServer}/download/${encodeURIComponent(file.id)}${encodePath(
        file.isRoot ? "" : file.path ?? "/"
    )}`;
};

export function usePreviewDialog() {
    const { showDialog } = useDialog();

    const showPreviewDialog = React.useCallback(
        async (opts: PreviewDialogOptions) => {
            return await showDialog<void>(({ close }) => (
                <PreviewDialog
                    {...opts}
                    onClose={opts.isClose !== false ? close : undefined}
                />
            ));
        },
        [showDialog]
    );

    return { showPreviewDialog };
}

function PreviewDialog({
    files,
    initialIndex,
    isRetro = false,
    useHls = false,
    forcedKind,
    apiServer = "",
    coverSrc,
    getObjectUrl,
    download,
    onClose,
}: PreviewDialogOptions & { onClose?: () => void }) {
    const [index, setIndex] = React.useState(initialIndex);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [neighborImageUrls, setNeighborImageUrls] = React.useState<string[]>([]);
    const [showPageIndicator, setShowPageIndicator] = React.useState(false);
    const [indicatorPageNumber, setIndicatorPageNumber] = React.useState<number | null>(null);
    const [requestSequence, setRequestSequence] = React.useState(1);
    const [previewLayoutState, setPreviewLayoutState] = React.useState<RetroPreviewLayoutState | undefined>(
        undefined,
    );
    const pageIndicatorTimerRef = React.useRef<number | null>(null);
    const previewCacheRef = React.useRef<PreviewDialogCache | null>(null);
    const handlePreviewLayoutStateChange = React.useCallback((state: RetroPreviewLayoutState) => {
        const normalized = normalizeRetroPreviewLayoutState(state);
        setPreviewLayoutState((current) =>
            areRetroPreviewLayoutStatesEqual(current, normalized) ? current : normalized
        );
    }, []);

    const file = files[index];
    if (!previewCacheRef.current) {
        previewCacheRef.current = new PreviewDialogCache(Math.max(files.length, 1));
    }
    const previewCache = previewCacheRef.current;

    const resolveObjectUrl = React.useCallback(
        async (
            target: TargetFile,
            onProgress?: (loaded: number, total: number) => void
        ) => {
            const key = getPreviewDialogCacheKey(target);
            const loadUrl = async () =>
                getObjectUrl
                    ? await getObjectUrl(target, onProgress)
                    : downloadUrl(apiServer, target);
            return await previewCache.loadNow(key, loadUrl);
        },
        [apiServer, getObjectUrl, previewCache]
    );
    const releaseObjectUrl = React.useCallback((url: string) => {
        previewCache.releaseObjectUrl(url);
    }, [previewCache]);

    const clearPageIndicator = React.useCallback(() => {
        if (pageIndicatorTimerRef.current !== null) {
            window.clearTimeout(pageIndicatorTimerRef.current);
            pageIndicatorTimerRef.current = null;
        }
        setShowPageIndicator(false);
    }, []);

    const move = React.useCallback(
        (delta: number) => {
            const nextIndex = Math.max(0, Math.min(index + delta, files.length - 1));
            if (nextIndex === index) {
                return;
            }
            clearPageIndicator();
            setIndicatorPageNumber(nextIndex + 1);
            pageIndicatorTimerRef.current = window.setTimeout(() => {
                setShowPageIndicator(true);
                pageIndicatorTimerRef.current = null;
            }, 180);
            setRequestSequence((current) => current + 1);
            setIndex(nextIndex);
        },
        [clearPageIndicator, files.length, index]
    );

    React.useEffect(() => {
        const candidates = [files[index + 1]].filter(
            (candidate): candidate is TargetFile => Boolean(candidate)
        );
        for (const candidate of candidates) {
            if (!shouldWarmPreviewDialogFile(candidate)) {
                continue;
            }
            previewCache.schedule(
                getPreviewDialogCacheKey(candidate),
                async () => {
                    const url = getObjectUrl
                        ? await getObjectUrl(candidate)
                        : downloadUrl(apiServer, candidate);
                    if (isImage(candidate.path) || isHeic(candidate.path)) {
                        if (isRetro) {
                            await primeImageElementCache(url);
                        } else {
                            await primeBrowserImageCache(url);
                        }
                    }
                    return url;
                },
                20,
            );
        }
    }, [apiServer, files, getObjectUrl, index, isRetro, previewCache]);

    React.useEffect(() => {
        let alive = true;

        if (!file || isRetro || !(isImage(file.path) || isHeic(file.path))) {
            setNeighborImageUrls([]);
            return () => {
                alive = false;
            };
        }

        const candidate = files[index + 1];
        if (!candidate || !(isImage(candidate.path) || isHeic(candidate.path))) {
            setNeighborImageUrls([]);
            return () => {
                alive = false;
            };
        }

        const loadNeighbor = async () => {
            const key = getPreviewDialogCacheKey(candidate);
            const url = await previewCache.getOrStart(
                key,
                async () =>
                    getObjectUrl
                        ? await getObjectUrl(candidate)
                        : downloadUrl(apiServer, candidate),
                30,
            );
            if (!alive) {
                return;
            }
            setNeighborImageUrls([url]);
        };

        loadNeighbor().catch(() => {
            if (!alive) {
                return;
            }
            setNeighborImageUrls([]);
        });

        return () => {
            alive = false;
        };
    }, [apiServer, file, files, getObjectUrl, index, isRetro, previewCache]);

    const touchRef = React.useRef<{
        startX: number;
        startY: number;
        startTime: number;
    } | null>(null);

    const isZoom = React.useCallback(() => {
        if (typeof window === "undefined") return false;

        const scale = window.visualViewport?.scale ?? 1;
        return scale > 1.01;
    }, []);

    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        const t = e.touches[0];
        touchRef.current = {
            startX: t.clientX,
            startY: t.clientY,
            startTime: Date.now(),
        };
    }, []);

    const handleTouchEnd = React.useCallback(
        (e: React.TouchEvent) => {
            const start = touchRef.current;
            touchRef.current = null;

            if (!start) return;

            const t = e.changedTouches[0];
            const dx = t.clientX - start.startX;
            const dy = t.clientY - start.startY;
            const dt = Date.now() - start.startTime;

            const absX = Math.abs(dx);
            const absY = Math.abs(dy);

            // 横フリックだけ拾う
            if (absX < 50) return;
            if (absX < absY * 1.2) return;
            if (dt > 800) return;

            if(isZoom()) {
                return;
            }
            if (dx < 0) {
                move(1); // 左にフリック => 次へ
            } else {
                move(-1); // 右にフリック => 前へ
            }
        },
        [isZoom ,move]
    );

    React.useEffect(() => {
        window.dispatchEvent(
            new CustomEvent(RETRO_PREVIEW_DIALOG_EVENT, {
                detail: { active: true },
            })
        );

        return () => {
            window.dispatchEvent(
                new CustomEvent(RETRO_PREVIEW_DIALOG_EVENT, {
                    detail: { active: false },
                })
            );
        };
    }, []);

    React.useEffect(() => {
        return () => {
            clearPageIndicator();
            previewCache.dispose();
        };
    }, [clearPageIndicator, previewCache]);

    const handleDisplayReady = React.useCallback(() => {
        clearPageIndicator();
    }, [clearPageIndicator]);

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.();
            }
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                move(1);
            }
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                move(-1);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [move, onClose]);

    if (!file) return null;

    return (
        <div className="safe-dialog-fullscreen flex flex-col overflow-hidden bg-slate-950">
            <div className="border-b border-slate-800 px-4 py-2 text-slate-100">
                <div className="min-w-0 truncate text-sm">
                    {index + 1} / {files.length} {file.path}
                    {loadingMessage ? ` : ${loadingMessage}` : ""}
                </div>
            </div>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="safe-top-offset-right fixed right-2 z-9998 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                >
                    <X size={16} />
                </button>
            )}

            <div
                className={[
                    "relative min-h-0 flex-1 touch-manipulation bg-black",
                    isRetro
                        ? "overflow-y-auto p-4"
                        : "flex items-center justify-center",
                ].join(" ")}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {neighborImageUrls.length > 0 && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
                    >
                        {neighborImageUrls.map((url) => (
                            <img
                                key={url}
                                src={url}
                                alt=""
                                decoding="async"
                                loading="eager"
                            />
                        ))}
                    </div>
                )}
                {showPageIndicator && indicatorPageNumber !== null && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                        <div className="rounded-full border border-slate-700/90 bg-slate-950/92 px-4 py-2 text-sm text-slate-100 shadow-lg">
                            {indicatorPageNumber} / {files.length}
                        </div>
                    </div>
                )}
                <PreviewPage
                    file={file}
                    requestSequence={requestSequence}
                    isRetro={isRetro}
                    useHls={useHls}
                    forcedKind={forcedKind}
                    apiServer={apiServer}
                    getObjectUrl={resolveObjectUrl}
                    releaseObjectUrl={releaseObjectUrl}
                    onLoadingMessage={setLoadingMessage}
                    onDisplayReady={handleDisplayReady}
                    coverSrc={coverSrc}
                    previewLayoutState={previewLayoutState}
                    onPreviewLayoutStateChange={handlePreviewLayoutStateChange}
                />
            </div>

            <div className="flex flex-wrap justify-center gap-2 border-t border-slate-800 px-4 py-3">
                <button
                    type="button"
                    onClick={() => move(-1)}
                    disabled={index <= 0}
                    className="rounded-lg border border-slate-700 px-4 py-1 text-sm text-slate-300 disabled:opacity-40"
                >
                    Prev
                </button>

                <button
                    type="button"
                    onClick={() => move(1)}
                    disabled={index >= files.length - 1}
                    className="rounded-lg border border-slate-700 px-4 py-1 text-sm text-slate-300 disabled:opacity-40"
                >
                    Next
                </button>

                {(!!preivewGlobalSetting.isOpen) && !useHls && (
                    <button
                        type="button"
                        onClick={() => {
                            const link = document.createElement("a");
                            link.href = downloadUrl(apiServer, file);
                            link.target = "_blank";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        className="rounded-lg border border-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800"
                    >
                        Open
                    </button>
                )}

                <button
                    type="button"
                    onClick={async () => {
                        if (download) {
                            await download(file, (loaded, total) => {
                                setLoadingMessage(`${loaded}/${total}`);
                            });
                            return;
                        }
                        const link = document.createElement("a");
                        link.href = downloadUrl(apiServer, file);
                        link.download = "";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    className="rounded-lg border border-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800"
                >
                    Download
                </button>

            </div>
        </div>
    );
}

export { RETRO_PREVIEW_DIALOG_EVENT };
