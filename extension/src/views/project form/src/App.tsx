import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { userDataType } from "./types/user";
import ProjectDescription from "./components/ProjectDescription";
import { FormFields, schema } from "./types/project";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "./utils/apis";
import { toast } from "react-hot-toast";

declare function acquireVsCodeApi(): any;

function App() {
  const [userData, setUserData] = useState<userDataType | null>(null);
  const vscode = useRef(null);
  if (vscode.current === null) {
    vscode.current = acquireVsCodeApi();
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess() {
      toast.success("Project created successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        (vscode?.current as any).postMessage({
          command: "projectCreated",
        });
      }, 500);
    },
    onError(error) {
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  const submitHandler: SubmitHandler<FormFields> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    (vscode?.current as any).postMessage({
      command: "loaded",
    });
    window.addEventListener("message", (e) => {
      const message = e.data;
      switch (message.command) {
        case "userData":
          setUserData(message.data);
          setValue("username", message.data.login);
          setValue("githubLink", message.data.html_url);
          setValue("avatar", message.data.avatar_url);
      }
    });
  }, []);

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl p-6 mx-auto my-6 text-white rounded-lg shadow-lg bg-primary-content">
      <h1 className="text-2xl font-bold">Project Details</h1>
      <p className="text-neutral-content">
        Fill out the form below with your project information.
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full gap-4 my-6"
      >
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="title" className="text-lg font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            className="w-full input input-bordered input-primary"
            {...register("title")}
          />
          {errors.title && (
            <div className="mt-1 text-red-500">
              {String(errors.title.message)}
            </div>
          )}
        </div>
        <div className="box-border flex flex-col w-full gap-1">
          <label htmlFor="description" className="text-lg font-bold">
            Description
          </label>
          <ProjectDescription setValue={setValue} />
          {errors.description && (
            <div className="mt-1 text-red-500">
              {String(errors.description.message)}
            </div>
          )}
        </div>
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="repoLink" className="text-lg font-bold">
              Repository Link
            </label>
            <input
              id="repoLink"
              type="url"
              placeholder="Enter GitHub repository link"
              className="w-full input input-bordered input-primary"
              {...register("repoLink")}
            />
            {errors.repoLink && (
              <div className="mt-1 text-red-500">
                {String(errors.repoLink.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="liveLink" className="text-lg font-bold">
              Live Link
            </label>
            <input
              id="liveLink"
              type="url"
              placeholder="Enter live link"
              className="w-full input input-bordered input-primary"
              {...register("liveLink")}
            />
            {errors.liveLink && (
              <div className="mt-1 text-red-500">
                {String(errors.liveLink.message)}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="techStack" className="text-lg font-bold">
              Tech Stack
            </label>
            <input
              id="techStack"
              type="text"
              placeholder="Enter tech stack"
              className="w-full input input-bordered input-primary"
              {...register("techStack")}
            />
            {errors.techStack && (
              <div className="mt-1 text-red-500">
                {String(errors.techStack.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="domain" className="text-lg font-bold">
              Domain
            </label>
            <input
              id="domain"
              type="text"
              placeholder="Enter domain"
              className="w-full input input-bordered input-primary"
              {...register("domain")}
            />
            {errors.domain && (
              <div className="mt-1 text-red-500">
                {String(errors.domain.message)}
              </div>
            )}
          </div>
        </div>
        <h2 className="text-xl font-bold">User Details</h2>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="username" className="text-lg font-bold">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter GitHub username"
            className="w-full input input-bordered input-primary"
            {...register("username")}
          />
          {errors.username && (
            <div className="mt-1 text-red-500">
              {String(errors.username.message)}
            </div>
          )}
        </div>
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="avatarLink" className="text-lg font-bold">
              Avatar Link
            </label>
            <input
              id="avatarLink"
              type="url"
              placeholder="Enter link"
              className="w-full input input-bordered input-primary"
              {...register("avatar")}
            />
            {errors.avatar && (
              <div className="mt-1 text-red-500">
                {String(errors.avatar.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="githubProfileLink" className="text-lg font-bold">
              GitHub
            </label>
            <input
              id="githubProfileLink"
              type="url"
              placeholder="Enter link"
              className="w-full input input-bordered input-primary"
              {...register("githubLink")}
            />
            {errors.githubLink && (
              <div className="mt-1 text-red-500">
                {String(errors.githubLink.message)}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="twitterProfileLink" className="text-lg font-bold">
              Twitter
            </label>
            <input
              id="twitterProfileLink"
              type="url"
              placeholder="Enter link"
              className="w-full input input-bordered input-primary"
              {...register("twitterLink")}
            />
            {errors.twitterLink && (
              <div className="mt-1 text-red-500">
                {String(errors.twitterLink.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="linkedInProfileLink" className="text-lg font-bold">
              LinkedIn
            </label>
            <input
              id="linkedInProfileLink"
              type="url"
              placeholder="Enter link"
              className="w-full input input-bordered input-primary"
              {...register("linkedInLink")}
            />
            {errors.linkedInLink && (
              <div className="mt-1 text-red-500">
                {String(errors.linkedInLink.message)}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <button className="btn bg-[#3b82f6] text-white w-fit">
            {isPending ? "Creating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
