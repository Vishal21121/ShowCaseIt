import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useRef } from "react";

declare function acquireVsCodeApi(): any;

function App() {
  const vscode = useRef(null);
  if (vscode.current === null) {
    vscode.current = acquireVsCodeApi();
  }

  useEffect(() => {
    window.addEventListener("message", (e) => {
      const message = e.data;
      switch (message.command) {
        case "loginUser":
          console.log(message.data);
      }
    });
  }, []);

  return (
    <div>
      <Login vscode={vscode} />
    </div>
  );
}

export default App;
