import { createContext, useContext } from "react";
import { ScreenValType } from "../types/screen";

const ScreenContext = createContext<ScreenValType | null>(null);

const useScreenContext = () => {
  return useContext(ScreenContext);
};

export { ScreenContext, useScreenContext };
