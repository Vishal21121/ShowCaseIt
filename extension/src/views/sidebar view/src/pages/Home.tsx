import { useUserContext } from "../context/UserContext";
import FloatingDock from "../components/FloatingDock";
import UserFeed from "../components/UserFeed";
import HomeFeed from "../components/HomeFeed";

function ProjectsHomePage({ vscode }: { vscode: any }): React.JSX.Element {
  const userContext = useUserContext();

  return (
    <div className="flex flex-col items-center w-full gap-4 p-2">
      <FloatingDock vscode={vscode} />
      <h1 className="text-lg font-bold">
        {userContext?.projectType === "home"
          ? "Explore Projects"
          : "My Projects"}
      </h1>
      {userContext?.projectType === "user" ? (
        <UserFeed vscode={vscode} />
      ) : (
        <HomeFeed vscode={vscode} />
      )}
    </div>
  );
}

export default ProjectsHomePage;
