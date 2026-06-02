import ReactDOM from "react-dom/client";
import App from "./App";
import { DialogProvider } from "./useDialog";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DialogProvider>
    <App />
  </DialogProvider>,
);
