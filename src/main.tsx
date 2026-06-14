import ReactDOM from "react-dom/client";
import App from "./App";
import { DialogProvider } from "./useDialog";

if (typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent)) {
  console.log("[retro-player startup] main:module-evaluated");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DialogProvider>
    <App />
  </DialogProvider>,
);
