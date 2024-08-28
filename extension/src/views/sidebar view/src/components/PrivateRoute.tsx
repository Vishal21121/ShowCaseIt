import React from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }: { children: React.JSX.Element }) {
  const userContext = useUserContext();
  const navigate = useNavigate();
  if (userContext?.userData) {
    return children;
  }
  navigate("/login");
}

export default PrivateRoute;
