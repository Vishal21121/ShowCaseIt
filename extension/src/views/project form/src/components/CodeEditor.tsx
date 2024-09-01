import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { andromeda } from "@uiw/codemirror-theme-andromeda";
import { UseFormSetValue } from "react-hook-form";
import { FormFields } from "../types/project";

function CodeEditor({
  code,
  setCode,
  setValue,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setValue: UseFormSetValue<FormFields>;
}) {
  const onChange = useCallback((val: string) => {
    setCode(val);
    setValue("description", val);
  }, []);
  return (
    <div className="w-full">
      <CodeMirror
        value={code}
        height="400px"
        maxHeight="400px"
        width="600px"
        extensions={[langs.markdown()]}
        onChange={onChange}
        theme={andromeda}
        className="w-full h-full"
      />
    </div>
  );
}

export default CodeEditor;
