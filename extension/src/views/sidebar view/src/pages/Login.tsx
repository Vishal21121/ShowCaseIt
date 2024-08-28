import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { RotatingLines } from "react-loader-spinner";

function Login({ vscode }: { vscode: any }): React.JSX.Element {
  const userContext = useUserContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userContext?.userData) {
      setLoading(false);
    }
  }, [userContext?.userData]);

  return (
    <div className="flex items-center justify-center h-screen">
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
  );
}

export default Login;
