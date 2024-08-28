import { createContext, useContext } from "react";
import { userDataType } from "../types/user";

type UserContextType = {
  userData: userDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext };
