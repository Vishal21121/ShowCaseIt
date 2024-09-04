import { useScreenContext } from "./context/ScreenContext";
import { useUserContext } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useRef } from "react";

declare function acquireVsCodeApi(): any;

function App() {
  const userContext = useUserContext();
  const screenContext = useScreenContext();

  const vscode = useRef(null);
  if (vscode.current === null) {
    vscode.current = acquireVsCodeApi();
  }

  useEffect(() => {
    renderPage();
    if (userContext?.userData) {
      screenContext?.setCurrentScreen("/");
    } else {
      (vscode.current as any)?.postMessage({
        command: "sendUserData",
      });
    }
    window.addEventListener("message", (e) => {
      const message = e.data;
      switch (message.command) {
        case "loginUser":
          userContext?.setUserData(message.data);
          screenContext?.setCurrentScreen("/");
          break;
        case "userData":
          userContext?.setUserData(message.data);
          screenContext?.setCurrentScreen("/");
          break;
        case "userLoggedOut":
          screenContext?.setCurrentScreen("/login");
      }
    });
  }, []);

  const renderPage = () => {
    switch (screenContext?.currentScreen) {
      case "/login":
        return <Login vscode={vscode} />;
      case "/":
        return <Home vscode={vscode} />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
