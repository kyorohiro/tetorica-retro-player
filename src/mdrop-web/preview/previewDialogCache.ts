import type { TargetFile } from "../api";
import { isHeic, isImage, isText } from "../utils";

type CacheEntry = {
    key: string;
    lastAccessedAt: number;
    promise: Promise<string>;
    reject: (error: unknown) => void;
    resolve: (value: string) => void;
    revokeOnDispose: boolean;
    status: "pending" | "ready" | "error";
    value?: string;
};

type QueueItem = {
    key: string;
    loader: () => Promise<string>;
    priority: number;
    queuedAt: number;
};

const createDeferred = <T>() => {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<T>((nextResolve, nextReject) => {
        resolve = nextResolve;
        reject = nextReject;
    });
    return { promise, resolve, reject };
};

export const getPreviewDialogCacheKey = (file: TargetFile) => `${file.id}|${file.path}`;

export const shouldWarmPreviewDialogFile = (file: TargetFile) =>
    isImage(file.path) || isHeic(file.path) || isText(file.path);

export class PreviewDialogCache {
    private readonly cacheNum: number;
    private readonly entries = new Map<string, CacheEntry>();
    private readonly queue = new Map<string, QueueItem>();
    private inFlightKey: string | null = null;

    constructor(cacheNum = 3) {
        this.cacheNum = cacheNum;
    }

    get(key: string): string | undefined {
        const entry = this.entries.get(key);
        if (!entry || entry.status !== "ready" || !entry.value) {
            return undefined;
        }
        this.touch(entry);
        return entry.value;
    }

    getOrStart(key: string, loader: () => Promise<string>, priority = 100): Promise<string> {
        const existing = this.entries.get(key);
        if (existing) {
            existing.status = existing.status === "error" ? "pending" : existing.status;
            this.touch(existing);
            if (existing.status === "ready") {
                return Promise.resolve(existing.value ?? "");
            }
            this.bumpQueuePriority(key, priority, loader);
            this.startCache();
            return existing.promise;
        }

        const deferred = createDeferred<string>();
        const entry: CacheEntry = {
            key,
            lastAccessedAt: Date.now(),
            promise: deferred.promise,
            reject: deferred.reject,
            resolve: deferred.resolve,
            revokeOnDispose: false,
            status: "pending",
        };
        this.entries.set(key, entry);
        this.queue.set(key, {
            key,
            loader,
            priority,
            queuedAt: Date.now(),
        });
        this.startCache();
        return entry.promise;
    }

    schedule(key: string, loader: () => Promise<string>, priority = 10): void {
        void this.getOrStart(key, loader, priority);
    }

    async startCache(): Promise<void> {
        if (this.inFlightKey) {
            return;
        }

        const next = [...this.queue.values()].sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
            return b.queuedAt - a.queuedAt;
        })[0];
        if (!next) {
            return;
        }

        this.queue.delete(next.key);
        this.inFlightKey = next.key;

        const entry = this.entries.get(next.key);
        if (!entry) {
            this.inFlightKey = null;
            void this.startCache();
            return;
        }

        try {
            const value = await next.loader();
            entry.status = "ready";
            entry.value = value;
            entry.revokeOnDispose = value.startsWith("blob:");
            this.touch(entry);
            entry.resolve(value);
            this.trimOverflow();
        } catch (error) {
            this.entries.delete(next.key);
            entry.status = "error";
            entry.reject(error);
        } finally {
            this.inFlightKey = null;
            void this.startCache();
        }
    }

    releaseObjectUrl(_url: string): void {
        // URL lifetime is owned by this cache while the dialog is open.
    }

    dispose(): void {
        this.queue.clear();
        for (const entry of this.entries.values()) {
            if (entry.revokeOnDispose && entry.value) {
                URL.revokeObjectURL(entry.value);
            }
        }
        this.entries.clear();
        this.inFlightKey = null;
    }

    private bumpQueuePriority(key: string, priority: number, loader: () => Promise<string>) {
        const queued = this.queue.get(key);
        if (queued) {
            queued.priority = Math.max(queued.priority, priority);
            queued.loader = loader;
            queued.queuedAt = Date.now();
            return;
        }
        const entry = this.entries.get(key);
        if (!entry || entry.status !== "pending" || this.inFlightKey === key) {
            return;
        }
        this.queue.set(key, {
            key,
            loader,
            priority,
            queuedAt: Date.now(),
        });
    }

    private touch(entry: CacheEntry) {
        entry.lastAccessedAt = Date.now();
        this.entries.delete(entry.key);
        this.entries.set(entry.key, entry);
    }

    private trimOverflow() {
        while (this.entries.size > this.cacheNum) {
            const oldest = [...this.entries.entries()]
                .filter(([key, entry]) => entry.status === "ready" && key !== this.inFlightKey)
                .sort((a, b) => a[1].lastAccessedAt - b[1].lastAccessedAt)[0];
            if (!oldest) {
                break;
            }
            const [, entry] = oldest;
            this.entries.delete(entry.key);
            if (entry.revokeOnDispose && entry.value) {
                URL.revokeObjectURL(entry.value);
            }
        }
    }
}
