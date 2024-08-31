import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function MarkDownRenderer({ code }: { code: string }) {
  return (
    <div className="h-[400px] w-[600px] p-2 overflow-auto border">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {code ? code : "There is no content to display"}
      </Markdown>
    </div>
  );
}

export default MarkDownRenderer;
