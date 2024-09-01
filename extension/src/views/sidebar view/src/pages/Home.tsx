import Card from "../components/Card";
import { useUserContext } from "../context/UserContext";
import FloatingDock from "../components/FloatingDock";
import { useQuery } from "@tanstack/react-query";
import { getUserPost } from "../utils/api";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

function ProjectsHomePage({ vscode }: { vscode: any }): React.JSX.Element {
  const userContext = useUserContext();
  console.log("home page", userContext?.userData);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getUserPost(String(userContext?.userData?.login)),
    enabled: false,
  });

  if (data) {
    userContext?.setPosts(data);
  }

  if (error) {
    console.log("home error", error);
    toast.error(error.message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }

  return (
    <div className="flex flex-col items-center w-full gap-4 p-2">
      <FloatingDock vscode={vscode} refetch={refetch} />
      {/* <button
        style={{ backgroundColor: "var(--vscode-button-background-color)" }}
        className="w-[90%] p-2 ring-2 ring-gray-300 text-lg rounded hover:ring-blue-500"
      >
        Create Post
      </button> */}
      {/* <div className="divider"></div> */}
      {/* Post section */}
      <h1 className="text-lg">{userContext?.projectType}</h1>
      <div className="pb-4 py-1 w-full h-[78vh] flex flex-col items-center gap-4 overflow-auto px-2">
        {isLoading && (
          <RotatingLines
            visible={true}
            width="48"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        )}
        {userContext?.posts &&
          userContext?.posts?.length > 0 &&
          userContext?.posts.map((el) => (
            <Card
              key={el._id}
              title={el.title}
              _id={el._id}
              avatar={el.userDetails.avatar}
              likes={el.likes}
              watched={el.watched}
              techStack={el.techStack}
              username={el.userDetails.username}
            />
          ))}
      </div>
    </div>
  );
}

export default ProjectsHomePage;
