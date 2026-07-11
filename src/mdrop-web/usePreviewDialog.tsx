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

type NeighborSlotState = {
    file: TargetFile | null;
    url: string | null;
    status: "idle" | "loading" | "ready" | "error";
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
    const inferPageLabel = React.useCallback((path: string) => {
        const basename = path.split(/[\\/]/).pop() ?? path;
        return basename.replace(/\.[^.]+$/, "") || basename;
    }, []);
    const [index, setIndex] = React.useState(initialIndex);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false);
    const [neighborImageUrls, setNeighborImageUrls] = React.useState<string[]>([]);
    const [neighborSlots, setNeighborSlots] = React.useState<{
        prev: NeighborSlotState;
        next: NeighborSlotState;
    }>({
        prev: { file: null, url: null, status: "idle" },
        next: { file: null, url: null, status: "idle" },
    });
    const [pageTurnDirection, setPageTurnDirection] = React.useState<"next" | "prev" | null>(null);
    const [requestSequence, setRequestSequence] = React.useState(1);
    const [previewLayoutState, setPreviewLayoutState] = React.useState<RetroPreviewLayoutState | undefined>(
        undefined,
    );
    const pageTurnResetTimerRef = React.useRef<number | null>(null);
    const loadingOverlayTimerRef = React.useRef<number | null>(null);
    const loadingOverlayHoldTimerRef = React.useRef<number | null>(null);
    const activeRequestSequenceRef = React.useRef(1);
    const completedRequestSequencesRef = React.useRef<Set<number>>(new Set());
    const previewCacheRef = React.useRef<PreviewDialogCache | null>(null);
    const handlePreviewLayoutStateChange = React.useCallback((state: RetroPreviewLayoutState) => {
        const normalized = normalizeRetroPreviewLayoutState(state);
        setPreviewLayoutState((current) =>
            areRetroPreviewLayoutStatesEqual(current, normalized) ? current : normalized
        );
    }, []);

    const file = files[index];
    const isNativeComicMode = Boolean(
        file && !isRetro && (isImage(file.path) || isHeic(file.path))
    );
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

    const clearOverlayTimers = React.useCallback(() => {
        if (loadingOverlayTimerRef.current !== null) {
            window.clearTimeout(loadingOverlayTimerRef.current);
            loadingOverlayTimerRef.current = null;
        }
        if (loadingOverlayHoldTimerRef.current !== null) {
            window.clearTimeout(loadingOverlayHoldTimerRef.current);
            loadingOverlayHoldTimerRef.current = null;
        }
    }, []);

    const scheduleOverlayForRequest = React.useCallback((sequence: number) => {
        clearOverlayTimers();
        setShowLoadingOverlay(false);
        loadingOverlayTimerRef.current = window.setTimeout(() => {
            loadingOverlayTimerRef.current = null;
            if (activeRequestSequenceRef.current !== sequence) {
                return;
            }
            if (completedRequestSequencesRef.current.has(sequence)) {
                return;
            }
            setShowLoadingOverlay(true);
            loadingOverlayHoldTimerRef.current = window.setTimeout(() => {
                if (activeRequestSequenceRef.current === sequence) {
                    setShowLoadingOverlay(false);
                }
                loadingOverlayHoldTimerRef.current = null;
            }, 220);
        }, 300);
    }, [clearOverlayTimers]);

    const move = React.useCallback(
        (delta: number) => {
            const nextDirection = delta > 0 ? "next" : "prev";
            const nextIndex = Math.max(0, Math.min(index + delta, files.length - 1));
            if (nextIndex === index) {
                return;
            }
            const nextRequestSequence = requestSequence + 1;
            setPageTurnDirection(nextDirection);
            if (pageTurnResetTimerRef.current !== null) {
                window.clearTimeout(pageTurnResetTimerRef.current);
            }
            pageTurnResetTimerRef.current = window.setTimeout(() => {
                setPageTurnDirection(null);
                pageTurnResetTimerRef.current = null;
            }, 220);
            activeRequestSequenceRef.current = nextRequestSequence;
            scheduleOverlayForRequest(nextRequestSequence);
            setRequestSequence(nextRequestSequence);
            setIndex(nextIndex);
        },
        [files.length, index, requestSequence, scheduleOverlayForRequest]
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

    React.useEffect(() => {
        let alive = true;

        if (!isNativeComicMode) {
            setNeighborSlots({
                prev: { file: null, url: null, status: "idle" },
                next: { file: null, url: null, status: "idle" },
            });
            return () => {
                alive = false;
            };
        }

        const prevFile = index > 0 ? files[index - 1] : null;
        const nextFile = index + 1 < files.length ? files[index + 1] : null;
        const canPreviewSlot = (target: TargetFile | null) =>
            Boolean(target && (isImage(target.path) || isHeic(target.path)));

        setNeighborSlots({
            prev: canPreviewSlot(prevFile)
                ? {
                    file: prevFile,
                    url: prevFile ? previewCache.get(getPreviewDialogCacheKey(prevFile)) ?? null : null,
                    status: prevFile && previewCache.get(getPreviewDialogCacheKey(prevFile)) ? "ready" : "loading",
                }
                : { file: prevFile, url: null, status: "idle" },
            next: canPreviewSlot(nextFile)
                ? {
                    file: nextFile,
                    url: nextFile ? previewCache.get(getPreviewDialogCacheKey(nextFile)) ?? null : null,
                    status: nextFile && previewCache.get(getPreviewDialogCacheKey(nextFile)) ? "ready" : "loading",
                }
                : { file: nextFile, url: null, status: "idle" },
        });

        const loadSlot = async (slot: "prev" | "next", target: TargetFile | null, priority: number) => {
            if (!target || !(isImage(target.path) || isHeic(target.path))) {
                return;
            }
            try {
                const key = getPreviewDialogCacheKey(target);
                const url = await previewCache.getOrStart(
                    key,
                    async () =>
                        getObjectUrl
                            ? await getObjectUrl(target)
                            : downloadUrl(apiServer, target),
                    priority,
                );
                if (!alive) {
                    return;
                }
                setNeighborSlots((current) => ({
                    ...current,
                    [slot]: {
                        file: target,
                        url,
                        status: "ready",
                    },
                }));
            } catch {
                if (!alive) {
                    return;
                }
                setNeighborSlots((current) => ({
                    ...current,
                    [slot]: {
                        file: target,
                        url: null,
                        status: "error",
                    },
                }));
            }
        };

        void loadSlot("prev", prevFile, 15);
        void loadSlot("next", nextFile, 25);

        return () => {
            alive = false;
        };
    }, [apiServer, files, getObjectUrl, index, isNativeComicMode, previewCache]);

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

    const handleDisplayReady = React.useCallback((displayedSequence: number) => {
        completedRequestSequencesRef.current.add(displayedSequence);
        if (displayedSequence !== activeRequestSequenceRef.current) {
            return;
        }
        clearOverlayTimers();
        setShowLoadingOverlay(false);
    }, [clearOverlayTimers]);

    React.useEffect(() => {
        return () => {
            previewCache.dispose();
            if (pageTurnResetTimerRef.current !== null) {
                window.clearTimeout(pageTurnResetTimerRef.current);
            }
            clearOverlayTimers();
        };
    }, [clearOverlayTimers, previewCache]);

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

    const renderNeighborSlot = (
        slot: NeighborSlotState,
        label: "Prev" | "Next",
        align: "left" | "right",
    ) => {
        const fileLabel = slot.file ? inferPageLabel(slot.file.path) : label;
        return (
            <div
                className={[
                    "hidden w-28 shrink-0 md:flex md:flex-col md:items-center md:gap-3",
                    align === "left" ? "md:text-left" : "md:text-right",
                ].join(" ")}
            >
                <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-slate-200">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {label}
                    </div>
                    <div className="mt-2 break-words text-xs leading-snug">
                        {fileLabel}
                    </div>
                    <div className="mt-3 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-slate-950">
                        {slot.status === "ready" && slot.url ? (
                            <img
                                src={slot.url}
                                alt={slot.file?.path ?? label}
                                className="max-h-full max-w-full object-contain opacity-80"
                            />
                        ) : slot.status === "loading" ? (
                            <div className="flex flex-col items-center gap-2 text-[11px] text-slate-400">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-slate-300" />
                                <span>Loading</span>
                            </div>
                        ) : slot.status === "error" ? (
                            <div className="text-[11px] text-red-300">Failed</div>
                        ) : (
                            <div className="text-[11px] text-slate-500">Empty</div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

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
                {showLoadingOverlay && !isNativeComicMode && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-slate-950/42">
                        <div className="w-[min(84%,30rem)] rounded-2xl border border-slate-700 bg-slate-950 px-6 py-5 text-center text-slate-100">
                            <p className="break-words text-[min(3.4vw,0.95rem)] font-medium leading-snug text-slate-200">
                                {inferPageLabel(file.path)}
                            </p>
                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800/90">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-sky-400/40 via-sky-100 to-sky-400/40"
                                    style={{
                                        width: "42%",
                                        transform:
                                            pageTurnDirection === "next"
                                                ? "translateX(130%)"
                                                : pageTurnDirection === "prev"
                                                    ? "translateX(-30%)"
                                                    : "translateX(40%)",
                                        transition: "transform 0.22s ease",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {isNativeComicMode ? (
                    <div className="flex h-full w-full items-center justify-center gap-4 px-4 py-4">
                        {renderNeighborSlot(neighborSlots.prev, "Prev", "left")}
                        <div className="min-w-0 flex-1">
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
                        {renderNeighborSlot(neighborSlots.next, "Next", "right")}
                    </div>
                ) : (
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
                )}
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
