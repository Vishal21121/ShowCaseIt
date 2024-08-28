import React, { useState } from "react";
import { ScreenContext } from "./ScreenContext";

function ScreenContextProvider({ children }: { children: React.JSX.Element }) {
  const [currentScreen, setCurrentScreen] = useState<string>("/login");
  return (
    <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </ScreenContext.Provider>
  );
}

export default ScreenContextProvider;
