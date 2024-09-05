import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { getInfiniteProjects, updateWatchedOrLikes } from "../utils/api";
import { RotatingLines } from "react-loader-spinner";
import Card from "./Card";
import { ProjectData } from "../types/project";
import { useInView } from "react-intersection-observer";

function HomeFeed({ vscode }: { vscode: any }) {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const queryClient = useQueryClient();
  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: getInfiniteProjects,
    initialPageParam: 1,
    // lastPage contains the response object
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { mutate } = useMutation({
    mutationKey: ["projects", "update"],
    mutationFn: ({ field, id }: { field: string; id: string }) =>
      updateWatchedOrLikes(field, id),
    onSuccess: () => {
      refetch();
    },
  });

  console.log("data", data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="pb-4 py-1 w-full h-[78vh] flex flex-col items-center gap-4 overflow-auto px-2">
        {/* {status === "pending" && (
          <RotatingLines
            visible={true}
            width="48"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        )} */}
        {data?.pages?.map((page) => (
          <div key={page.currentPage} className="flex flex-col w-full gap-4">
            {page?.data?.map((el: ProjectData) => (
              <Card el={el} vscode={vscode} key={el.id} updateMutate={mutate} />
            ))}
          </div>
        ))}
        {status === "pending" && (
          <RotatingLines
            visible={true}
            width="24"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        )}
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
