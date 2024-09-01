import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserContextProvider from "./context/UserContextProvider.tsx";
import ScreenContextProvider from "./context/ScreenContextProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <ScreenContextProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
        </QueryClientProvider>
      </ScreenContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
