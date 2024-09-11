import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  FormFields,
  schema,
  updateProjectData,
  updateProjectDataType,
} from "../types/project";
import { domainNames } from "../utils/domainNames";
import { useMutation } from "@tanstack/react-query";
import { updateProject } from "../utils/apis";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useEffect } from "react";
import ProjectDescription from "./ProjectDescription";
import { zodResolver } from "@hookform/resolvers/zod";

function UpdateForm({
  vscode,
  currentProjectData,
}: {
  vscode: any;
  currentProjectData: updateProjectDataType | undefined;
}) {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
  });
  const {
    error: updateError,
    isPending: isUpdatePending,
    mutate: updateMutate,
  } = useMutation({
    mutationKey: ["project", "update"],
    mutationFn: (data: updateProjectData) => updateProject(data),
    onSuccess: () => {
      notyf.success("Project updated successfully");
      setTimeout(() => {
        (vscode?.current as any).postMessage({
          command: "projectUpdated",
        });
      }, 1000);
    },
  });

  if (updateError) {
    console.log(updateError);
    notyf.error(updateError.message);
  }

  const submitHandler: SubmitHandler<FormFields> = (data) => {
    console.log("updateForm data", data);
    updateMutate({
      title: data.title,
      description: data.description,
      liveLink: data.liveLink,
      techStack: data.techStack.split(","),
      id: (currentProjectData as updateProjectDataType).id,
    });
  };

  useEffect(() => {
    methods.setValue(
      "title",
      (currentProjectData as updateProjectDataType)?.title
    );
    methods.setValue(
      "description",
      (currentProjectData as updateProjectDataType)?.description
    );
    methods.setValue(
      "repoLink",
      (currentProjectData as updateProjectDataType)?.repoLink
    );
    methods.setValue(
      "liveLink",
      (currentProjectData as updateProjectDataType)?.liveLink
    );
    methods.setValue(
      "techStack",
      (currentProjectData as updateProjectDataType)?.techStack.join(",")
    );
    methods.setValue(
      "domain",
      (currentProjectData as updateProjectDataType)?.domain
    );
    methods.setValue(
      "username",
      (currentProjectData as updateProjectDataType)?.userDetails.username
    );
    methods.setValue(
      "avatar",
      (currentProjectData as updateProjectDataType)?.userDetails.avatar
    );
    methods.setValue(
      "githubLink",
      (currentProjectData as updateProjectDataType)?.userDetails.gitHub
    );
    methods.setValue(
      "twitterLink",
      (currentProjectData as updateProjectDataType)?.userDetails.twitter
    );
    methods.setValue(
      "linkedInLink",
      (currentProjectData as updateProjectDataType)?.userDetails.linkedIn
    );
    methods.setValue(
      "description",
      (currentProjectData as updateProjectDataType)?.description
    );
  }, [currentProjectData, methods]);

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl p-6 mx-auto my-6 text-white rounded-lg shadow-lg bg-primary-content">
      <h1 className="text-2xl font-bold">Update Project Form</h1>
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
              <div className="mt-1 text-red-500">
                {String(methods.formState.errors.title?.message)}
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
                type="url"
                placeholder="Enter GitHub repository link"
                className="w-full input input-bordered input-primary"
                {...methods.register("repoLink")}
                disabled={true}
              />
              {methods.formState.errors.repoLink && (
                <div className="mt-1 text-red-500">
                  {String(methods.formState.errors.repoLink.message)}
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
              <label htmlFor="techStack" className="text-lg font-bold">
                Tech Stack
              </label>
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
                disabled={true}
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
              disabled={true}
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
                type="url"
                placeholder="Enter link"
                className="w-full input input-bordered input-primary"
                disabled={true}
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
                disabled={true}
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
              <label htmlFor="twitterProfileLink" className="text-lg font-bold">
                Twitter
              </label>
              <input
                id="twitterProfileLink"
                type="url"
                placeholder="Enter link"
                className="w-full input input-bordered input-primary"
                disabled={true}
                {...methods.register("twitterLink")}
              />
              {methods.formState.errors.twitterLink && (
                <div className="mt-1 text-red-500">
                  {methods.formState.errors?.twitterLink?.message}
                </div>
              )}
            </div>
            <div className="flex flex-col w-1/2 gap-1">
              <label
                htmlFor="linkedInProfileLink"
                className="text-lg font-bold"
              >
                LinkedIn
              </label>
              <input
                id="linkedInProfileLink"
                type="url"
                placeholder="Enter link"
                className="w-full input input-bordered input-primary"
                disabled={true}
                {...methods.register("linkedInLink")}
              />
              {methods.formState.errors.linkedInLink && (
                <div className="mt-1 text-red-500">
                  {String(methods.formState.errors.linkedInLink.message)}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <button className="btn bg-[#3b82f6] text-white w-fit">
              {isUpdatePending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default UpdateForm;
