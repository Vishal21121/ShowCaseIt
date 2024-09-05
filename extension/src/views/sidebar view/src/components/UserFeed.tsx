import Card from "../components/Card";
import { useUserContext } from "../context/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getUserPost, updateWatchedOrLikes } from "../utils/api";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";
import { ProjectData } from "../types/project";

function UserFeed({ vscode }: { vscode: any }) {
  const userContext = useUserContext();
  const queryClient = useQueryClient();

  // Route to get user posts
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getUserPost(String(userContext?.userData?.login)),
    enabled: false,
  });

  if (error) {
    toast.error(error.message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }

  // refetch function to get the posts manually
  const refetchFunction = () => {
    refetch();
  };

  // Mutation to delete the post
  const { mutate } = useMutation({
    mutationKey: ["project", "delete"],
    mutationFn: ({ id }: { id: string }) => deleteProject(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
      if (removePost) {
        removePost(variables.id);
      }
    },
  });

  // Function to remove the post from the UI
  function removePost(id: string) {
    const filteredData = data?.filter((el: ProjectData) => el.id !== id);
    queryClient.setQueryData(["posts"], filteredData);
  }

  useEffect(() => {
    userContext?.setRefetchContainer(refetchFunction);
  }, [refetch]);

  return (
    <div className="pb-4 py-1 w-full h-[78vh] flex flex-col items-center gap-4 overflow-auto px-2">
      {isLoading && (
        <RotatingLines
          visible={true}
          width="24"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      )}
      {data &&
        data?.map((el: ProjectData) => {
          return (
            <Card
              el={el}
              vscode={vscode}
              key={el.id}
              removePost={removePost}
              userDeleteMutate={mutate}
            />
          );
        })}
    </div>
  );
}

export default UserFeed;
