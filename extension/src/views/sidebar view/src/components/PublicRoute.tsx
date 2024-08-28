import React from "react";
import { useUserContext } from "../context/UserContext";

function PublicRoute({ children }: { children: React.JSX.Element }) {
  const userContext = useUserContext();
  if (!userContext?.userData) {
    console.log("got");
    return children;
  }
}

export default PublicRoute;
