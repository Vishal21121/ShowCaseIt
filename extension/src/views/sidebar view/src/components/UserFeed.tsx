import Card from "../components/Card";
import { useUserContext } from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserPost } from "../utils/api";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";
import { ProjectData } from "../types/project";

function UserFeed({ vscode }: { vscode: any }) {
  const userContext = useUserContext();

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

  const refetchFunction = () => {
    refetch();
  };

  useEffect(() => {
    userContext?.setRefetchContainer(refetchFunction);
  }, [refetch]);

  return (
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
      {data &&
        data?.map((el: ProjectData) => {
          return (
            <Card el={el} vscode={vscode} key={el._id} refetch={refetch} />
          );
        })}
    </div>
  );
}

export default UserFeed;
