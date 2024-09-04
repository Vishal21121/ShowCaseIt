import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { IoIosStats } from "react-icons/io";
import { CardData } from "../types/project";

function Card({
  title,
  _id,
  avatar,
  likes,
  username,
  watched,
  techStack,
  domain,
  vscode,
  el,
}: CardData): React.JSX.Element {
  const callLoadCommandWithData = () => {
    vscode?.current.postMessage({
      command: "loadProjectRender",
      data: el,
    });
  };
  return (
    <div
      className="flex flex-col w-full gap-2 p-2 rounded cursor-pointer ring ring-primary bg-primary-content"
      id={_id}
      onClick={callLoadCommandWithData}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center w-10 h-10 gap-2">
          <img className="rounded-full" src={avatar} alt="" />
          <p className="font-bold">{username}</p>
        </div>
        <p className="text-lg truncate text-bold">{title}</p>
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
          <p className="badge badge-info">{domain}</p>
          <div className="flex gap-2">
            <IoMdThumbsUp className="text-lg" />
            <p className="text-sm truncate">{likes}</p>
          </div>
          <div className="flex gap-2">
            <IoIosStats className="text-lg" />
            <p className="text-sm truncate">{watched}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
