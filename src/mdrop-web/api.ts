
type Target = {
    id: string,
    path: string,
    isFile: boolean,
    isDir: boolean,
};

type TargetFile = {
    id: string,
    path: string,
    isFile: boolean,
    isDir: boolean,
    size: number,
    createdAt?: number,
    modifiedAt?: number,
    isRoot?: boolean,
}

type SharedFileInfo = {
    id: string,
    name: string,
    path: string,
    url: string,
    isDir: boolean,
};

type FileTargetFile = TargetFile & {
    entry?: File;
    resolveEntry?: () => Promise<File>;
};

const getMeta = async (): Promise<{ apiServer: string; hasFfmpeg: boolean }> => {
    const cfg = window.__MDROP_CONFIG__;
    const apiServer = cfg?.apiServer;
    const hasFfmpeg = (cfg as { hasFfmpeg?: boolean } | undefined)?.hasFfmpeg === true;
    if (!apiServer || apiServer == "") {
        const url = new URL(window.location.href);
        return { apiServer: url.origin, hasFfmpeg };
    }
    return { apiServer, hasFfmpeg };
};

const getDownloadList = async (): Promise<Target[]> => {

    const meta = await getMeta();
    const resp = await fetch(`${meta.apiServer}/api/downloadList`, {
        headers: {
            "X-mDrop-API-Key": window.__MDROP_CONFIG__?.apiKey ?? "",
        },
    });
    if (!resp.ok) {
        if (resp.status === 401) {
            if (!sessionStorage.getItem("mdrop_api_key_reload")) {
                sessionStorage.setItem("mdrop_api_key_reload", "1");
                alert("Session expired. Reloading now.");
                location.reload();
            }
            alert("Wrong API key. Please restart mDrop.");
            throw new Error("Wrong API key");
        }

        sessionStorage.removeItem("mdrop_api_key_reload");
        throw "";
    }
    const data = await resp.text();
    //console.log(data);
    return JSON.parse(data);
}


const getFiles = async (id: string, path: string): Promise<TargetFile[]> => {

    const meta = await getMeta();
    const resp = await fetch(
        `${meta.apiServer}/api/files?i=${encodeURIComponent(id)}&p=${encodeURIComponent(path)}`, {
        headers: {
            "X-mDrop-API-Key": window.__MDROP_CONFIG__?.apiKey ?? "",
        },
    });
    if (!resp.ok) {
        throw "";
    }
    const data = await resp.text();
    //console.log(data);
    return JSON.parse(data);
}

const shareBlobFile = async (blob: Blob, filename: string): Promise<SharedFileInfo> => {
    const meta = await getMeta();
    const resp = await fetch(
        `${meta.apiServer}/api/shareBlobFile?filename=${encodeURIComponent(filename)}`,
        {
            method: "POST",
            headers: {
                "X-mDrop-API-Key": window.__MDROP_CONFIG__?.apiKey ?? "",
                "Content-Type": "application/octet-stream",
            },
            body: blob,
        }
    );
    if (!resp.ok) {
        throw new Error(`shareBlobFile failed: ${resp.status}`);
    }
    return await resp.json();
}


export {
    getDownloadList,
    getFiles,
    getMeta,
    shareBlobFile,
}

export type {
    Target,
    TargetFile,
    FileTargetFile,
    SharedFileInfo,
}
