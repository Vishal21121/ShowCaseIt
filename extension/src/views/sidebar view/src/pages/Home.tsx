import { useUserContext } from "../context/UserContext";
import FloatingDock from "../components/FloatingDock";
import UserFeed from "../components/UserFeed";

function ProjectsHomePage({ vscode }: { vscode: any }): React.JSX.Element {
  const userContext = useUserContext();
  console.log("home page", userContext?.userData);

  return (
    <div className="flex flex-col items-center w-full gap-4 p-2">
      <FloatingDock vscode={vscode} refetch={userContext?.refetchContainer} />
      {/* <button
        style={{ backgroundColor: "var(--vscode-button-background-color)" }}
        className="w-[90%] p-2 ring-2 ring-gray-300 text-lg rounded hover:ring-blue-500"
      >
        Create Post
      </button> */}
      {/* <div className="divider"></div> */}
      {/* Post section */}
      <h1 className="text-lg">
        {userContext?.projectType === "home"
          ? "Explore Projects"
          : "My Projects"}
      </h1>
      {userContext?.projectType === "user" ? <UserFeed /> : ""}
    </div>
  );
}

export default ProjectsHomePage;
