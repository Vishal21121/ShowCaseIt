import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { userDataType } from "../types/user";
import { ProjectData } from "../types/project";

function UserContextProvider({ children }: { children: React.JSX.Element }) {
  const [userData, setUserData] = useState<userDataType | null>(null);
  const [posts, setPosts] = useState<ProjectData[] | null>(null);
  const [projectType, setProjectType] = useState<string>("home");
  const [refetchContainer, setRefetchContainer] = useState<(() => void) | null>(
    null
  );

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        posts,
        setPosts,
        projectType,
        setProjectType,
        refetchContainer,
        setRefetchContainer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
