import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { IoIosStats } from "react-icons/io";
import { CardData } from "../types/project";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { deleteProject } from "../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Card({
  vscode,
  el,
  removePost,
  homeMutate,
}: CardData): React.JSX.Element {
  const userContext = useUserContext();
  const queryClient = useQueryClient();

  const callLoadCommandWithData = () => {
    homeMutate && homeMutate({ field: "watched", id: el.id });
    vscode?.current.postMessage({
      command: "loadProjectRender",
      data: el,
    });
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["project", "delete"],
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
      if (removePost) {
        removePost(el.id);
      }
    },
  });

  return (
    <div
      className="flex flex-col w-full gap-2 p-2 rounded cursor-pointer ring ring-primary bg-primary-content"
      id={el.id}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-wrap items-center justify-between w-full gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <img
              className="w-10 h-10 rounded-full"
              src={el.userDetails.avatar}
              alt=""
            />
            <p className="font-bold">{el.userDetails.username}</p>
          </div>
          {userContext?.projectType === "user" && (
            <div className="flex flex-wrap gap-2">
              <MdDeleteOutline
                className="text-xl text-secondary hover:text-primary"
                onClick={() => mutate(el.id)}
              />
              <FaRegEdit className="text-xl text-secondary hover:text-primary" />
            </div>
          )}
        </div>
        <p
          className="text-lg truncate text-bold"
          onClick={callLoadCommandWithData}
        >
          {el.title}
        </p>
        <div className="flex flex-wrap gap-4">
          {/* <details className="dropdown">
            <summary className="text-sm">Tech Stack</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {techStack.length &&
                techStack.map((el) => (
                  <li>
                    <a>{el}</a>
                  </li>
                ))}
            </ul>
          </details> */}
          <p className="badge badge-info">{el.domain}</p>
          <div
            className="flex gap-2"
            onClick={() => {
              homeMutate && homeMutate({ field: "likes", id: el.id });
            }}
          >
            <IoMdThumbsUp className="text-lg" />
            <p className="text-sm truncate">{el.likes}</p>
          </div>
          <div className="flex gap-2">
            <IoIosStats className="text-lg" />
            <p className="text-sm truncate">{el.watched}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
