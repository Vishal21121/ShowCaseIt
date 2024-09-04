import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import MarkDownContent from "./components/MarkDownContent";
import Stats from "./components/Stats";
import Buttons from "./components/Buttons";
import Avatar from "./components/Avatar";
import { useEffect, useRef, useState } from "react";
import { ProjectData } from "./types/project";

declare function acquireVsCodeApi(): any;

function App() {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const vscode = useRef(null);

  useEffect(() => {
    if (vscode.current === null) {
      vscode.current = acquireVsCodeApi();
    }
    (vscode.current as any).postMessage({
      command: "loaded",
    });
    window.addEventListener("message", (e) => {
      const message = e.data;
      switch (message.command) {
        case "projectData":
          if (message.data) {
            setProjectData(message.data);
          }
      }
    });
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      {/* title */}
      <h1 className="mx-auto text-4xl font-bold text-white text-wrap">
        {projectData?.title}
      </h1>

      {/* Github and Link */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 mt-4">
          <a
            href={projectData?.liveLink}
            className="btn btn-secondary btn-outline"
          >
            <div className="flex items-center justify-center gap-2">
              <p className="text-base text-white">View on GitHub</p>
              <FaGithub className="text-2xl text-white " />
            </div>
          </a>
          <a
            className="btn btn-secondary btn-outline"
            href={projectData?.liveLink}
          >
            <div className="flex items-center justify-center gap-2">
              <p className="text-base text-white">Live Link</p>
              <FaExternalLinkAlt className="text-2xl text-white" />
            </div>
          </a>
        </div>

        {/* User Short info */}
        <div className="flex items-center gap-2">
          <Avatar
            url={projectData?.userDetails.avatar!}
            name={projectData?.userDetails.username!}
            github={projectData?.userDetails.gitHub!}
            twitter={projectData?.userDetails.twitter!}
            linkedIn={projectData?.userDetails.linkedIn!}
          />
          <div className="w-1 h-1 -mt-4 bg-white rounded-full"></div>
          <p className="-mt-4 text-lg font-bold text-neutral-content">
            Sep 2, 2024
          </p>
        </div>
      </div>

      {/* Markdown render */}
      <MarkDownContent content={projectData?.description!} />
      {/* Stats */}
      <div className="flex justify-center">
        <Stats likes={projectData?.likes!} watched={projectData?.watched!} />
      </div>
      {/* Tech Stack */}
      <h1 className="text-2xl font-bold text-white">Tech Stack</h1>
      <div className="flex flex-wrap gap-2">
        {projectData?.techStack &&
          projectData?.techStack.map((el) => <Buttons content={el} />)}
      </div>
      {/* User Details */}
      <div className="mt-4">
        <p className="text-2xl font-bold text-white">Created By</p>
        <div className="mt-2 mb-0 divider"></div>
      </div>
      <div>
        <Avatar
          url={projectData?.userDetails.avatar!}
          name={projectData?.userDetails.username!}
          github={projectData?.userDetails.gitHub!}
          twitter={projectData?.userDetails.twitter!}
          linkedIn={projectData?.userDetails.linkedIn!}
        />
      </div>
    </div>
  );
}

export default App;
