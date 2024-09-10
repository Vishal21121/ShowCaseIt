import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { RotatingLines } from "react-loader-spinner";
import { useQueryClient } from "@tanstack/react-query";

function Login({ vscode }: { vscode: any }): React.JSX.Element {
  const userContext = useUserContext();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    userContext?.setUserData(null);
    userContext?.setProjectType("home");
    queryClient.invalidateQueries({
      queryKey: ["items"],
    });
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    if (userContext?.userData) {
      setLoading(false);
    }
  }, [queryClient, userContext, userContext?.userData]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full gap-4 overflow-hidden ">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-extrabold text-white">Welcome</h1>
          <p className="text-neutral-content">
            Login with your GitHub account to continue.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setLoading(true);
            vscode.current.postMessage({ command: "loginUser" });
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <p>Logging in</p>
              <RotatingLines
                width="18"
                visible={true}
                strokeWidth="5"
                strokeColor="black"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <FaGithub className="text-xl" />
              Continue with GitHub
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
