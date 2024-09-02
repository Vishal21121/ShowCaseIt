import { createContext, useContext } from "react";
import { userDataType } from "../types/user";
import { ProjectData } from "../types/project";

type UserContextType = {
  userData: userDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>;
  posts: ProjectData[] | null;
  setPosts: React.Dispatch<React.SetStateAction<ProjectData[] | null>>;
  projectType: string;
  setProjectType: React.Dispatch<React.SetStateAction<string>>;
  refetchContainer: (() => void) | null;
  setRefetchContainer: React.Dispatch<
    React.SetStateAction<(() => void) | null>
  >;
};

const UserContext = createContext<UserContextType | null>(null);

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext };
