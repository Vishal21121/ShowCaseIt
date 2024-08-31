import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { IoIosStats } from "react-icons/io";

function Card(): React.JSX.Element {
  return (
    <div className="flex flex-col w-full gap-2 p-2 rounded cursor-pointer ring ring-primary bg-primary-content">
      <div className="flex flex-col w-full gap-2">
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
              <li className="">
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
      <div className="flex items-center w-10 h-10 gap-2">
        <img
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/89929777?v=4"
          alt=""
        />
        <p className="">Vishal21121</p>
      </div>
    </div>
  );
}

export default Card;
