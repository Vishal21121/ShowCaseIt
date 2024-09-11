import { useState } from "react";
import CodeEditor from "./CodeEditor";
import MarkDownRenderer from "./MarkDownRenderer";

function ProjectDescription() {
  const [code, setCode] = useState("");
  return (
    <div className="w-full">
      <div role="tablist" className="w-full tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Edit"
          defaultChecked
        />
        <div role="tabpanel" className="w-full p-4 tab-content h-[420px]">
          <CodeEditor setCode={setCode} />
        </div>
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Preview"
        />
        <div
          role="tabpanel"
          className="p-4 tab-content max-h-[420px] overflow-auto"
        >
          <MarkDownRenderer content={code} />
        </div>
      </div>
    </div>
  );
}

export default ProjectDescription;
