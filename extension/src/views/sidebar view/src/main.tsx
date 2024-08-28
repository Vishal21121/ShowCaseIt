import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserContextProvider from "./context/UserContextProvider.tsx";
import ScreenContextProvider from "./context/ScreenContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <ScreenContextProvider>
        <App />
      </ScreenContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
