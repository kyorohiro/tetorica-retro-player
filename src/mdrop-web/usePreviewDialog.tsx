import React, { useState } from "react";
import { X } from "lucide-react";
import { useDialog } from "../useDialog";
import {
    areRetroPreviewLayoutStatesEqual,
    normalizeRetroPreviewLayoutState,
    type RetroPreviewLayoutState,
} from "../retro-player/previewLayoutState";
import type { TargetFile } from "./api";
import { PreviewPage } from "./preview/PreviewPage";
import { preivewGlobalSetting } from "./preview/preivewSetting";

const RETRO_PREVIEW_DIALOG_EVENT = "tetorica-retro-preview-dialog-active";

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
    console.log(">> coverSrc", !!coverSrc);
    const [index, setIndex] = React.useState(initialIndex);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [previewLayoutState, setPreviewLayoutState] = React.useState<RetroPreviewLayoutState | undefined>(
        undefined,
    );
    const handlePreviewLayoutStateChange = React.useCallback((state: RetroPreviewLayoutState) => {
        const normalized = normalizeRetroPreviewLayoutState(state);
        setPreviewLayoutState((current) =>
            areRetroPreviewLayoutStatesEqual(current, normalized) ? current : normalized
        );
    }, []);

    const file = files[index];

    const move = React.useCallback(
        (delta: number) => {
            setIndex((current) =>
                Math.max(0, Math.min(current + delta, files.length - 1))
            );
        },
        [files.length]
    );

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
                    "min-h-0 flex-1 touch-manipulation bg-black",
                    isRetro
                        ? "overflow-y-auto p-4"
                        : "flex items-center justify-center",
                ].join(" ")}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <PreviewPage
                    file={file}
                    isRetro={isRetro}
                    useHls={useHls}
                    forcedKind={forcedKind}
                    apiServer={apiServer}
                    getObjectUrl={getObjectUrl}
                    onLoadingMessage={setLoadingMessage}
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
