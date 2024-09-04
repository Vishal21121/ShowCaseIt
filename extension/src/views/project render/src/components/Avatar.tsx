import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function Avatar({
  url,
  name,
  github,
  twitter,
  linkedIn,
}: {
  url: string;
  name: string;
  github: string;
  twitter: string;
  linkedIn: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2 avatar">
        <div className="w-12 rounded-full">
          <img src={url} />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-base font-bold text-white">{name}</p>
        <div className="flex gap-2">
          <a href={github}>
            <FaGithub className="text-2xl cursor-pointer " />
          </a>
          <a href={twitter}>
            <FaXTwitter className="text-2xl cursor-pointer " />
          </a>
          <a href={linkedIn}>
            <FaLinkedin className="text-2xl cursor-pointer " />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
