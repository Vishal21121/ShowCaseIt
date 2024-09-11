import { useEffect, useRef, useState } from "react";
import Form from "./components/Form";
import { createProjectDataType, updateProjectDataType } from "./types/project";
import UpdateForm from "./components/UpdateForm";

declare function acquireVsCodeApi(): any;

function App() {
  const vscode = useRef(null);
  const [currentProjectData, setCurrentProjectData] = useState<
    createProjectDataType | updateProjectDataType
  >();
  const [formType, setFormType] = useState("");

  if (vscode.current === null) {
    vscode.current = acquireVsCodeApi();
  }

  useEffect(() => {
    (vscode?.current as any).postMessage({
      command: "loaded",
    });
    window.addEventListener("message", (e) => {
      console.log("got data", e.data);
      const message = e.data;
      switch (message.command) {
        case "createProject":
          setCurrentProjectData(message.data);
          setFormType("createProject");
          break;
        case "updateProject":
          setCurrentProjectData(message.data);
          setFormType("updateProject");
          break;
      }
    });
  }, []);
  return (
    <div>
      {formType === "createProject" ? (
        <Form
          vscode={vscode}
          currentProjectData={currentProjectData as createProjectDataType}
        />
      ) : (
        <UpdateForm
          vscode={vscode}
          currentProjectData={currentProjectData as updateProjectDataType}
        />
      )}
    </div>
  );
}

export default App;
