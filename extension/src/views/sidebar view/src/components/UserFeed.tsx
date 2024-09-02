import Card from "../components/Card";
import { useUserContext } from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserPost } from "../utils/api";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";

function UserFeed() {
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
  );
}

export default UserFeed;
