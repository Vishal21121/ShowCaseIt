import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { userDataType } from "../types/user";

function UserContextProvider({ children }: { children: React.JSX.Element }) {
  const [userData, setUserData] = useState<userDataType | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
