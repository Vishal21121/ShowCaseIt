import React from "react";
import { FaGithub } from "react-icons/fa";

function Login({ vscode }: { vscode: any }): React.JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="btn btn-primary"
        onClick={() => {
          vscode.current.postMessage({ command: "loginUser" });
        }}
      >
        {" "}
        <FaGithub className="text-xl" />
        Continue with GitHub
      </button>
    </div>
  );
}

export default Login;
