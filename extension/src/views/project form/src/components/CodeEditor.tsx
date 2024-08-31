import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { andromeda } from "@uiw/codemirror-theme-andromeda";

function CodeEditor({
  code,
  setCode,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) {
  const onChange = useCallback((val: string) => {
    console.log("val:", val);
    setCode(val);
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
