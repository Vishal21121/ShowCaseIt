import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { getInfiniteProjects, updateWatchedOrLikes } from "../utils/api";
import { RotatingLines } from "react-loader-spinner";
import Card from "./Card";
import { ProjectData } from "../types/project";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";

function HomeFeed({ vscode }: { vscode: any }) {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: getInfiniteProjects,
    initialPageParam: 1,
    // lastPage contains the response object
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { mutate } = useMutation({
    mutationKey: ["projects", "update"],
    mutationFn: ({
      field,
      id,
      userLiked,
    }: {
      field: string;
      id: string;
      userLiked?: string;
    }) => updateWatchedOrLikes(field, id, userLiked),
    onSuccess: () => {
      refetch();
    },
  });

  if (isError) {
    toast.error(error.message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <div className="pb-4 py-1 w-full h-[78vh] flex flex-col items-center gap-4 overflow-auto px-2">
        {isLoading && (
          <span className="mx-auto">
            <RotatingLines
              visible={true}
              width="24"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </span>
        )}
        {data?.pages?.map((page) => (
          <div key={page.currentPage} className="flex flex-col w-full gap-4">
            {page?.data?.map((el: ProjectData) => (
              <Card el={el} vscode={vscode} key={el.id} updateMutate={mutate} />
            ))}
            {isFetchingNextPage && (
              <span className="mx-auto">
                <RotatingLines
                  visible={true}
                  width="24"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </span>
            )}
          </div>
        ))}

        {!hasNextPage && status != "pending" && (
          <p className="mx-auto text-neutral-content">
            Yay! You have seen it all 😊
          </p>
        )}
        <div ref={ref} style={{ height: "1px" }}></div>
      </div>
    </>
  );
}

export default HomeFeed;
