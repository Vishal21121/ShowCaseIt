import Card from "../components/Card";
import { useUserContext } from "../context/UserContext";
import FloatingDock from "../components/FloatingDock";

function ProjectsHomePage({ vscode }: { vscode: any }): React.JSX.Element {
  const userContext = useUserContext();
  console.log("home page", userContext?.userData);

  return (
    <div className="flex flex-col items-center w-full gap-4 p-2">
      <FloatingDock vscode={vscode} />
      {/* <button
        style={{ backgroundColor: "var(--vscode-button-background-color)" }}
        className="w-[90%] p-2 ring-2 ring-gray-300 text-lg rounded hover:ring-blue-500"
      >
        Create Post
      </button> */}
      {/* <div className="divider"></div> */}
      {/* Post section */}
      <h1 className="text-lg">Explore Projects</h1>
      <div className="pb-4 py-1 w-full h-[78vh] flex flex-col items-center gap-4 overflow-auto px-2">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default ProjectsHomePage;
