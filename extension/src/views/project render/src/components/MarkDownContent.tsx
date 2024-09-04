import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const MarkDownContent = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[
        rehypeRaw,
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ]}
      className="w-full px-12 py-4 prose-sm prose text-white markdown max-w-none"
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <div className="overflow-hidden bg-gray-900 rounded-t-lg">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                <span className="text-sm font-medium text-gray-300">
                  {match[1]}
                </span>
                <button
                  className="text-sm text-gray-500 hover:text-gray-300"
                  onClick={() =>
                    navigator.clipboard.writeText(String(children))
                  }
                >
                  Copy
                </button>
              </div>
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={dracula}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: "16px",
                }}
              />
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDownContent;
