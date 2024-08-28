import { useScreenContext } from "./context/ScreenContext";
import { useUserContext } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useRef } from "react";

declare function acquireVsCodeApi(): any;

function App() {
  console.log("rendered");

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
          console.log(message.data);
          userContext?.setUserData(message.data);
          screenContext?.setCurrentScreen("/");
          break;
      }
    });
  }, []);

  const renderPage = () => {
    console.log(screenContext?.currentScreen);
    switch (screenContext?.currentScreen) {
      case "/login":
        return <Login vscode={vscode} />;
      case "/":
        return <Home />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
