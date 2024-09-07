import { MdLogout } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { useRef } from "react";
import { useUserContext } from "../context/UserContext";
import { useScreenContext } from "../context/ScreenContext";

interface IconProps {
  className?: string;
}

function HomeIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlusIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

// function SearchIcon(props: IconProps) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }

function UserIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function FloatingDock({
  vscode,
  refetch,
}: {
  vscode: any;
  refetch: (() => void) | null | undefined;
}) {
  const userContext = useUserContext();
  const screenContext = useScreenContext();
  console.log("data got", userContext?.userData);

  const sendLoadWebview = () => {
    vscode?.current?.postMessage({
      command: "loadProjectForm",
      data: {
        projectData: {
          username: userContext?.userData?.login,
          avatar: userContext?.userData?.avatar_url,
          gitHub: userContext?.userData?.html_url,
        },
        formType: "createProject",
      },
    });
  };

  const drawerCheckboxRef = useRef<HTMLInputElement>(null);
  const handleRefetchClick = () => {
    userContext?.setProjectType("user");
    if (refetch) {
      refetch();
    }
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = false;
    }
  };

  return (
    <div className="flex items-center justify-center w-full gap-4 p-2 rounded-full ring ring-primary">
      <div
        className="tooltip tooltip-bottom"
        data-tip="Home"
        onClick={() => userContext?.setProjectType("home")}
      >
        <HomeIcon className="cursor-pointer" />
      </div>
      {/* <div className="tooltip tooltip-bottom" data-tip="Search">
        <SearchIcon className="cursor-pointer" />
      </div> */}
      <div
        className="tooltip tooltip-bottom"
        data-tip="Create"
        onClick={() =>
          userContext?.userData
            ? sendLoadWebview()
            : screenContext?.setCurrentScreen("/login")
        }
      >
        <PlusIcon className="cursor-pointer" />
      </div>
      <div className="tooltip tooltip-bottom" data-tip="User">
        <div className="drawer drawer-end">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle"
            ref={drawerCheckboxRef}
          />
          {userContext?.userData && (
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button">
                <UserIcon className="cursor-pointer drawer-button" />
              </label>
            </div>
          )}
          <div className="z-10 drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="w-3/4 min-h-full p-4 menu bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <div
                  className="flex flex-wrap gap-2"
                  onClick={() => {
                    userContext?.setUserData(null);
                    vscode?.current.postMessage({ command: "logoutUser" });
                  }}
                >
                  <MdLogout className="text-xl text-white " />
                  <p className="text-base text-white">Logout</p>
                </div>
              </li>
              <li>
                <div
                  className="flex flex-wrap gap-2"
                  onClick={handleRefetchClick}
                >
                  <FaRegFileLines className="text-xl text-white" />
                  <p className="text-base text-white">My Projects</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingDock;
