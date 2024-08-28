import Card from "../components/Card";
import { useUserContext } from "../context/UserContext";

function ProjectsHomePage(): React.JSX.Element {
  const userContext = useUserContext();
  console.log("home page", userContext?.userData);
  return (
    <div className="flex flex-col items-center w-full p-2">
      <button
        style={{ backgroundColor: "var(--vscode-button-background-color)" }}
        className="w-[90%] p-2 ring-2 ring-gray-300 text-lg rounded hover:ring-blue-500"
      >
        Create Post
      </button>
      <div className="divider"></div>
      {/* Post section */}
      <h1 className="text-lg">Explore Projects</h1>
      <div className="mt-4 py-4 w-full h-[78vh] flex flex-col items-center gap-2 overflow-auto">
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
