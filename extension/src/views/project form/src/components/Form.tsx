import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import ProjectDescription from "./ProjectDescription";
import { createProjectDataType, FormFields, schema } from "../types/project";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../utils/apis";
import { domainNames } from "../utils/domainNames";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function Form({
  vscode,
  currentProjectData,
}: {
  vscode: any;
  currentProjectData: createProjectDataType | undefined;
}) {
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
  });

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess() {
      notyf.success("Project created successfully");
      setTimeout(() => {
        (vscode?.current as any).postMessage({
          command: "projectCreated",
        });
      }, 1000);
    },
    onError(error) {
      notyf.error(error.message);
    },
  });

  const submitHandler: SubmitHandler<FormFields> = (data) => {
    console.log("data from form", data);
    mutate(data);
  };

  useEffect(() => {
    if (currentProjectData) {
      methods.setValue("username", currentProjectData?.username);
      methods.setValue("avatar", currentProjectData?.avatar);
      methods.setValue("githubLink", currentProjectData?.gitHub);
    }
  }, [currentProjectData, methods]);

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl p-6 mx-auto my-6 text-white rounded-lg shadow-lg bg-primary-content">
      <h1 className="text-2xl font-bold">Create Project Form</h1>
      <p className="text-neutral-content">
        Fill out the form below with your project information.
      </p>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submitHandler)}
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
              {...methods.register("title")}
            />
            {methods.formState.errors.title && (
              <div className="mt-1 text-red-500 ">
                {String(methods.formState.errors.title.message)}
              </div>
            )}
          </div>
          <div className="box-border flex flex-col w-full gap-1">
            <label htmlFor="description" className="text-lg font-bold">
              Description
            </label>
            <ProjectDescription />
            {methods.formState.errors.description && (
              <div className="mt-1 text-red-500">
                {methods.formState.errors?.description?.message}
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
                type="text"
                placeholder="Enter GitHub repository link"
                className="w-full input input-bordered input-primary"
                {...methods.register("repoLink")}
              />
              {methods.formState.errors.repoLink && (
                <div className="mt-1 text-red-500">
                  {String(methods.formState.errors.repoLink.message)}
                </div>
              )}
            </div>
            <div className="flex flex-col w-1/2 gap-1">
              <div className="flex items-center gap-2">
                <label htmlFor="liveLink" className="text-lg font-bold">
                  Live Link
                </label>
                <p className="text-neutral-content">(optional)</p>
              </div>
              <input
                id="liveLink"
                type="text"
                placeholder="Enter live link"
                className="w-full input input-bordered input-primary"
                {...methods.register("liveLink")}
              />
              {methods.formState.errors.liveLink && (
                <div className="mt-1 text-red-500">
                  {String(methods.formState.errors.liveLink.message)}
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full gap-2">
            <div className="flex flex-col w-1/2 gap-1">
              <div className="flex items-center gap-2">
                <label htmlFor="techStack" className="text-lg font-bold">
                  Tech Stack
                </label>
                <p className="text-neutral-content">(separate with comma)</p>
              </div>
              <input
                id="techStack"
                type="text"
                placeholder="Enter tech stack"
                className="w-full input input-bordered input-primary"
                {...methods.register("techStack")}
              />
              {methods.formState.errors.techStack && (
                <div className="mt-1 text-red-500">
                  {String(methods.formState.errors.techStack.message)}
                </div>
              )}
            </div>
            <div className="flex flex-col w-1/2 gap-1">
              <label htmlFor="domain" className="text-lg font-bold">
                Domain
              </label>
              <select
                className="w-full max-w-xs select select-bordered"
                id="domain"
                {...methods.register("domain")}
              >
                {domainNames.map((domain) => (
                  <option key={domain}>{domain}</option>
                ))}
              </select>
              {methods.formState.errors.domain && (
                <div className="mt-1 text-red-500">
                  {String(methods.formState.errors.domain.message)}
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
              {...methods.register("username")}
            />
            {methods.formState.errors.username && (
              <div className="mt-1 text-red-500">
                {String(methods.formState.errors.username.message)}
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
                type="text"
                placeholder="Enter link"
                className="w-full input input-bordered input-primary"
                {...methods.register("avatar")}
              />
              {methods.formState.errors.avatar && (
                <div className="mt-1 text-red-500">
                  {String(methods.formState.errors.avatar.message)}
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
                {...methods.register("githubLink")}
              />
              {methods.formState.errors.githubLink && (
                <div className="mt-1 text-red-500">
                  {String(methods.formState.errors.githubLink.message)}
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="flex flex-col w-1/2 gap-1">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="twitterProfileLink"
                  className="text-lg font-bold"
                >
                  Twitter
                </label>
                <p className="text-neutral-content">(optional)</p>
              </div>
              <input
                id="twitterProfileLink"
                type="text"
                placeholder="Enter link"
                className="w-full input input-bordered input-primary"
                {...methods.register("twitterLink")}
              />
              {methods.formState.errors.twitterLink && (
                <div className="mt-1 text-red-500">
                  {methods.formState.errors?.twitterLink?.message}
                </div>
              )}
            </div>
            <div className="flex flex-col w-1/2 gap-1">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="linkedInProfileLink"
                  className="text-lg font-bold"
                >
                  LinkedIn
                </label>
                <p className="text-neutral-content">(optional)</p>
              </div>
              <input
                id="linkedInProfileLink"
                type="text"
                placeholder="Enter link"
                className="w-full input input-bordered input-primary"
                {...methods.register("linkedInLink")}
              />
              {methods.formState.errors.linkedInLink && (
                <div className="mt-1 text-red-500 ">
                  {String(methods.formState.errors.linkedInLink.message)}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-end">
            {isPending ? (
              <button className="btn bg-[#3b82f6] text-white w-fit">
                <span className="loading loading-spinner"></span>
                Creating
              </button>
            ) : (
              <button className="btn bg-[#3b82f6] text-white w-fit">
                Submit
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Form;
