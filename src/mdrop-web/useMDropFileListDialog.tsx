import React, { useMemo, useState } from "react";
import { File, Folder, Loader, X } from "lucide-react";
import { useDialog } from "../useDialog";
import { TargetFile, getFiles } from "./api";
import { downloadUrl, usePreviewDialog } from "./usePreviewDialog";
import {
    getFfmpegStreamingEnabled,
    getFfmpegStreamingMode,
    listenFfmpegStreamingEnabled,
    listenFfmpegStreamingMode,
} from "./ffmpegPreference";
import { isAudio, isBrowserPlayableVideo, isEpub, isImage, isPdf, isText, isVideo, isVideoExtended } from "./utils";
import { useZipFileListDialog } from "./useZipFileListDialog";

type SortMode = "name" | "modifiedAt" | "comic";

const collator = new Intl.Collator("ja", {
    numeric: true,
    sensitivity: "base",
});

const isCover = (path: string) => {
    const name = path.replace(/.*\//, "");
    return /^(cover|表紙|hyoushi|000)\.(png|jpe?g|webp|gif|svg|avif)$/i.test(name);
};

const compareByName = (a: TargetFile, b: TargetFile) =>
    collator.compare(a.path, b.path);

const compareComic = (a: TargetFile, b: TargetFile) => {
    if (a.isDir && !b.isDir) return -1;
    if (!a.isDir && b.isDir) return 1;
    if (isCover(a.path) && !isCover(b.path)) return -1;
    if (!isCover(a.path) && isCover(b.path)) return 1;
    return compareByName(a, b);
};

type FileListDialogOptions = {
    title?: string;
    apiServer: string;
    targetId: string;
    initialPath?: string;
    useHls?: boolean;
};

const parentPathOf = (path: string) => {
    const clean = path.replace(/\/+$/, "");
    if (!clean || clean === "/") {
        return "/";
    }
    const parent = clean.split("/").slice(0, -1).join("/");
    return parent || "/";
};
export function useMDropFileListDialog() {
    const { showDialog } = useDialog();

    const showMDropFileListDialog = React.useCallback(
        async (opts: FileListDialogOptions) => {
            return await showDialog<void>(({ close }) => (
                <FileListDialog {...opts} onClose={close} />
            ));
        },
        [showDialog]
    );

    return { showMDropFileListDialog };
}

const hlsSubUrl = (apiServer: string, folderId: string, file: TargetFile): string => {
    const subpath = file.path.startsWith("/") ? file.path.slice(1) : file.path;
    const encodedSubpath = subpath.split("/").map(encodeURIComponent).join("/");
    return `${apiServer}/hls-sub/${encodeURIComponent(folderId)}/${encodedSubpath}`;
};

const audioSubUrl = (apiServer: string, folderId: string, file: TargetFile): string => {
    const subpath = file.path.startsWith("/") ? file.path.slice(1) : file.path;
    const encodedSubpath = subpath.split("/").map(encodeURIComponent).join("/");
    return `${apiServer}/audio-hls-sub/${encodeURIComponent(folderId)}/${encodedSubpath}`;
};

function FileListDialog({
    title,
    apiServer,
    targetId,
    initialPath = "/",
    useHls = false,
    onClose,
}: FileListDialogOptions & { onClose: () => void }) {
    const [currentUseHls, setCurrentUseHls] = useState(
        () => useHls || getFfmpegStreamingEnabled()
    );
    const [currentFfmpegMode, setCurrentFfmpegMode] = useState(() => getFfmpegStreamingMode());
    const [path, setPath] = useState(initialPath);
    const [files, setFiles] = useState<TargetFile[]>([]);
    const [sort, setSort] = useState<SortMode>("comic");
    const [loading, setLoading] = useState(false);

    const { showPreviewDialog } = usePreviewDialog();
    const { showSelectDialog } = useDialog();
    const { showZipFileListDialog } = useZipFileListDialog();

    React.useEffect(() => {
        setCurrentUseHls(useHls || getFfmpegStreamingEnabled());
    }, [useHls]);

    React.useEffect(() => listenFfmpegStreamingEnabled(setCurrentUseHls), []);
    React.useEffect(() => listenFfmpegStreamingMode(setCurrentFfmpegMode), []);


    const load = React.useCallback(
        async (nextPath: string) => {
            setLoading(true);

            try {
                const resolvedPath = nextPath === ".."
                    ? parentPathOf(path)
                    : nextPath;

                const nextFiles = await getFiles(targetId, resolvedPath);
                setFiles(nextFiles ?? []);
                setPath(resolvedPath);
            } finally {
                setLoading(false);
            }
        },
        [targetId, path]
    );
    /*
        const load = React.useCallback(
            async (nextPath: string) => {
                console.log("> load")
                setLoading(true);
                if (nextPath == "..") {
                    console.log(">> 1", path)
                    nextPath = path.split("/").slice(0, -1).join("/");
                }
                try {
                    console.log(">> 2", nextPath);
                    const nextFiles = await getFiles(targetId, nextPath);
                    setFiles(nextFiles ?? []);
                    setPath(nextPath);
                } finally {
                    setLoading(false);
                }
            },
            [targetId]
        );
        */

    React.useEffect(() => {
        load(initialPath);
    }, [initialPath]);

    const sortedFiles = useMemo<TargetFile[]>(() => {
        const next = [...files];
        let hasParent = false;
        console.log(">>hasParent 1", hasParent, path)
        if (path != "/" && path != "") {
            console.log(">>hasParent 2", hasParent, ">", path, "<")
            hasParent = true;
        }
        next.sort((a, b) => {
            if (sort === "modifiedAt") {
                if (a.isDir && !b.isDir) return -1;
                if (!a.isDir && b.isDir) return 1;
                return (b.modifiedAt ?? 0) - (a.modifiedAt ?? 0);
            }

            if (sort === "comic") {
                return compareComic(a, b);
            }

            if (a.isDir && !b.isDir) return -1;
            if (!a.isDir && b.isDir) return 1;
            return compareByName(a, b);
        });


        if (hasParent) {
            console.log(">>hasParent 3", hasParent, path)
            return [{
                id: "p1",
                path: "..",
                isFile: false,
                isDir: false,
                size: 0,
                createdAt: undefined,
                modifiedAt: undefined,
            }, ...next, {
                id: "p2",
                path: "..",
                isFile: false,
                isDir: false,
                size: 0,
                createdAt: undefined,
                modifiedAt: undefined,
            }] as any;
        } else {
            return next;
        }
    }, [files, sort, path]);

    const previewableFiles = React.useMemo(
        () =>
            sortedFiles.filter((target) => {
                if (!target.isFile) return false;
                const isVideoHere = currentUseHls ? isVideoExtended(target.path) : isBrowserPlayableVideo(target.path);
                return (
                    isImage(target.path) ||
                    isVideoHere ||
                    isText(target.path) ||
                    isAudio(target.path) ||
                    isPdf(target.path) ||
                    isEpub(target.path)
                );
            }),
        [currentUseHls, sortedFiles]
    );

    const openPreview = React.useCallback(
        async (file: TargetFile, mode: "direct" | "ffmpeg" | "ffmpeg-audio") => {
            const forceFfmpeg = mode === "ffmpeg";
            const forceFfmpegAudio = mode === "ffmpeg-audio";
            const sourceFiles = forceFfmpegAudio
                ? previewableFiles.filter((target) => isVideo(target.path) || isVideoExtended(target.path) || isAudio(target.path))
                : previewableFiles;
            const index = sourceFiles.findIndex((target) => target.path === file.path);
            if (index < 0) return;

            const canUseFfmpeg = currentUseHls && (isVideoExtended(file.path) || isAudio(file.path));
            const getObjectUrl = forceFfmpeg && canUseFfmpeg
                ? async (target: TargetFile) => hlsSubUrl(apiServer, targetId, target)
                : forceFfmpegAudio && canUseFfmpeg
                    ? async (target: TargetFile) => audioSubUrl(apiServer, targetId, target)
                : undefined;

            await showPreviewDialog({
                files: sourceFiles,
                initialIndex: index,
                isRetro: true,
                useHls: (forceFfmpeg || forceFfmpegAudio) && canUseFfmpeg,
                forcedKind: forceFfmpegAudio ? "audio" : undefined,
                apiServer,
                ...(getObjectUrl ? { getObjectUrl } : {}),
            });
        },
        [apiServer, currentUseHls, previewableFiles, showPreviewDialog, targetId]
    );

    const downloadFile = React.useCallback((file: TargetFile) => {
        const a = document.createElement("a");
        a.href = downloadUrl(apiServer, file);
        a.target = "_blank";
        a.download = file.path.replace(/.*\//, "");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, [apiServer]);

    const handleFileClick = React.useCallback(
        async (file: TargetFile, filename: string) => {
            const canPlayDirect =
                isImage(file.path) ||
                isBrowserPlayableVideo(file.path) ||
                isText(file.path) ||
                isAudio(file.path) ||
                isPdf(file.path) ||
                isEpub(file.path);
            const canPlayWithFfmpeg = currentUseHls && (isVideoExtended(file.path) || isAudio(file.path));
            const isArchive =
                file.path.endsWith(".zip") ||
                file.path.endsWith(".cbz") ||
                file.path.endsWith(".rar") ||
                file.path.endsWith(".cbr");

            const options: {
                value: string;
                label: string;
                description: string;
            }[] = [];

            if (canPlayDirect) {
                options.push({
                    value: "play",
                    label: "Play",
                    description: "Try direct preview first.",
                });
            }

            if (canPlayWithFfmpeg) {
                options.push({
                    value: "ffmpeg",
                    label: "ffmpeg",
                    description: currentFfmpegMode === "audio"
                        ? "Open through ffmpeg audio-only HLS playback."
                        : "Open through ffmpeg HLS playback.",
                });
            }

            if (isArchive) {
                options.push({
                    value: "open-archive",
                    label: "Open archive",
                    description: "Browse files inside this archive.",
                });
            }

            options.push({
                value: "download",
                label: "Download",
                description: "Save the original file.",
            });

            const action = await showSelectDialog({
                title: filename,
                message: "Choose an action for this file.",
                options,
                cancelText: "Cancel",
            });

            if (action === "play") {
                await openPreview(file, "direct");
                return;
            }

            if (action === "ffmpeg") {
                await openPreview(file, currentFfmpegMode === "audio" ? "ffmpeg-audio" : "ffmpeg");
                return;
            }

            if (action === "open-archive") {
                await showZipFileListDialog({
                    title: filename,
                    source: {
                        type: "url",
                        url: downloadUrl(apiServer, file),
                    },
                    initialPath: "/",

                });
                return;
            }

            if (action === "download") {
                downloadFile(file);
            }
        },
        [apiServer, currentFfmpegMode, currentUseHls, downloadFile, openPreview, showSelectDialog, showZipFileListDialog]
    );

    return (
        <div className="safe-dialog-card flex w-[min(96vw,900px)] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-xl">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
                <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold">{title ?? "Files"}</h2>
                    <div className="break-all text-xs text-slate-400">{path}</div>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        if (currentUseHls) fetch(`${apiServer}/hls/cleanup`, { method: "POST" }).catch(() => {});
                        onClose();
                    }}
                    aria-label="Close"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                >
                    <X size={16} />
                </button>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortMode)}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                >
                    <option value="comic">Comic</option>
                    <option value="name">Name</option>
                    <option value="modifiedAt">Modified</option>
                </select>

                <button
                    type="button"
                    className="inline-flex w-20 items-center justify-center rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800"
                    onClick={() => load(path)}
                >
                    {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Reload"}
                </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                    {sortedFiles.map((file) => {
                        const filename = file.path.replace(/.*\//, "");

                        return (
                            <div
                                key={file.id + file.path}
                                className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm"
                            >
                                {file.isFile ? (
                                    <button
                                        type="button"
                                        className="w-full text-left"

                                        onClick={async () => {
                                            await handleFileClick(file, filename);
                                        }}

                                    >
                                        <div className="flex items-start gap-2 font-medium text-slate-100">
                                            <File className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                                            <span className="min-w-0 break-all text-cyan-50">
                                                {filename}
                                            </span>
                                        </div>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-full text-left"
                                        onClick={() => load(file.path)}
                                    >
                                        <div className="flex items-start gap-2 font-medium text-slate-100">
                                            <Folder className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                                            <span className="min-w-0 break-all text-amber-50">
                                                {filename}/
                                            </span>
                                        </div>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
