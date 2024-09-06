import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { IoIosStats } from "react-icons/io";
import { CardData } from "../types/project";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { BiSolidLike } from "react-icons/bi";
import { useScreenContext } from "../context/ScreenContext";

function Card({
  vscode,
  el,
  updateMutate,
  userDeleteMutate,
}: CardData): React.JSX.Element {
  const userContext = useUserContext();
  const screenContext = useScreenContext();

  const callLoadCommandWithData = () => {
    if (userContext?.projectType === "home") {
      updateMutate &&
        updateMutate({
          field: "watched",
          id: el.id,
        });
    }
    vscode?.current.postMessage({
      command: "loadProjectRender",
      data: el,
    });
  };

  return (
    <div
      className="flex flex-col w-full gap-4 p-2 border rounded-md shadow-md cursor-pointer shadow-neutral"
      id={el.id}
    >
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-wrap items-center justify-between w-full gap-2">
          <p className="p-2 text-black badge badge-success badge-outline">
            {el.domain}
          </p>
          {userContext?.projectType === "user" && (
            <div className="flex flex-wrap gap-2">
              <MdDeleteOutline
                className="text-xl text-secondary hover:text-primary"
                onClick={() =>
                  userDeleteMutate && userDeleteMutate({ id: el.id })
                }
              />
              <FaRegEdit className="text-xl text-secondary hover:text-primary" />
            </div>
          )}
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Click to Expand">
          <p
            className="text-lg font-bold text-white truncate"
            onClick={callLoadCommandWithData}
          >
            {el.title}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <p className="text-lg font-bold text-white">Tech Stack:</p>
          {
            <div className="flex flex-wrap gap-2">
              {el?.techStack.length &&
                el?.techStack.map((el) => (
                  <span className="badge badge-primary badge-outline">
                    {el}
                  </span>
                ))}
            </div>
          }

          {userContext?.projectType === "home" && (
            <div className="flex items-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={el.userDetails.avatar}
                  alt=""
                />
                <p className="font-bold">{el.userDetails.username}</p>
              </div>
              <div className="flex gap-2">
                {el.likedUsers.includes(userContext?.userData?.login!) ? (
                  <BiSolidLike className="text-lg text-primary" />
                ) : (
                  <IoMdThumbsUp
                    className="text-lg"
                    onClick={() => {
                      if (userContext?.userData) {
                        updateMutate &&
                          updateMutate({
                            field: "likes",
                            id: el.id,
                            userLiked: userContext?.userData?.login!,
                          });
                      } else {
                        screenContext?.setCurrentScreen("/login");
                      }
                    }}
                  />
                )}
                {/* <IoMdThumbsUp className="text-lg" /> */}
                <p className="text-sm truncate">{el.likes}</p>
              </div>
              <div className="flex gap-2">
                <IoIosStats className="text-lg" />
                <p className="text-sm truncate">{el.watched}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
