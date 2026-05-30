import { useRef } from "react";
import "./App.css";

function App() {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (ev: React.DragEvent) => {
    ev.preventDefault();
    const files = ev.dataTransfer.files;

    if (files.length > 0) {
      previewFile(files[0]);
    }
  };

  const handleDragOver = (ev: React.DragEvent) => {
    ev.preventDefault();
  };
  async function selectFiles() {
    fileInputRef.current?.click();
  }

  async function selectFolders() {
    folderInputRef.current?.click();
  }
  //
  const previewFile = (file: File) => {
    console.log("> openFile", file);
  };

  return (
    <main className="h-screen overflow-y-auto bg-slate-200 text-slate-800"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="mx-auto max-w-3xl px-6 py-8">
        <header className="mb-8">
          <p className="text-sm text-slate-400">...</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Tetorica Retro Player
          </h1>
        </header>
        {
          //
        }
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={selectFiles}
                className="rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop files here, or click to add files
              </button>

              <button
                type="button"
                onClick={selectFolders}
                className="hidden rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop folders here, or click to add folders
              </button>
            </div>
            {
              //
            }
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(ev) => {
                const files = ev.currentTarget.files;
                if (files && files.length > 0) previewFile(files[0]);

                ev.currentTarget.value = "";
              }}
            />

            <input
              ref={folderInputRef}
              type="file"
              multiple
              // React の型に webkitdirectory がない場合があるので any 扱い
              {...({ webkitdirectory: "true" } as any)}
              className="hidden"
              onChange={(ev) => {
                //const files = ev.currentTarget.files;
                //if (files) openPreview(files);
                ev.currentTarget.value = "";
              }}
            />
            {
              //
            }
          </div>
        </section>
        {
          //
        }
      </div>
    </main>
  );
}

export default App;
