import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { IoIosStats } from "react-icons/io";

function Card(): React.JSX.Element {
  return (
    <div className="w-[90%] rounded p-2 flex flex-col gap-4">
      <p>
        Title: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
        hic?
      </p>
      <p>
        Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Esse, fugiat?
      </p>
      <div className="flex gap-4 flex-wrap">
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
  );
}

export default Card;
