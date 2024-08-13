import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { IoIosStats } from "react-icons/io";

function Card(): React.JSX.Element {
  return (
    <div className="flex items-center w-full gap-4 p-2 border rounded cursor-pointer">
      <div className="flex flex-col gap-2">
        <img
          className="hidden max-w-42 max-h-42 sm:visible"
          src="https://avatars.githubusercontent.com/u/89929777?v=4"
          alt=""
        />
        <p className="">Vishal21121</p>
      </div>
      <div className="flex flex-col flex-wrap w-3/4 gap-2">
        <p className="truncate">
          Title: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ratione, hic?
        </p>
        <p className="truncate">
          Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Esse, fugiat?
        </p>
        <div className="flex flex-wrap gap-4">
          <details className="dropdown">
            <summary className="">Tech Stack</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </details>
          <p className="badge badge-info">Web Dev</p>
          <div className="flex gap-2">
            <IoMdThumbsUp className="text-lg" />
            <p>1000</p>
          </div>
          <div className="flex gap-2">
            <IoIosStats className="text-lg" />
            <p>10000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
