import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { andromeda } from "@uiw/codemirror-theme-andromeda";
import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

function CodeEditor({
  setCode,
}: {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) {
  const descriptionSchema = z
    .string({
      required_error: "Description is required",
    })
    .min(3, "Description should be of minimum 3 characters");

  const { setValue: setUpdateValue, setError: setUpdateError } =
    useFormContext();

  const onChange = useCallback(
    (val: string) => {
      setCode(val);
      setUpdateValue("description", val);
      const result = descriptionSchema.safeParse(val);
      if (result.error) {
        setUpdateError("description", result.error);
      }
    },
    [descriptionSchema, setCode, setUpdateError, setUpdateValue]
  );
  return (
    <div className="w-full">
      <Controller
        name="description"
        render={({ field }) => (
          <CodeMirror
            value={field.value}
            height="400px"
            maxHeight="400px"
            width="600px"
            extensions={[langs.markdown()]}
            onChange={onChange}
            theme={andromeda}
            className="w-full h-full"
          />
        )}
      />
    </div>
  );
}

export default CodeEditor;
