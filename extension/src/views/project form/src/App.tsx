import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { userDataType } from "./types/user";

declare function acquireVsCodeApi(): any;

function App() {
  const [userData, setUserData] = useState<userDataType | null>(null);
  // Custom validation function to check if a string is separated by commas
  const commaSeparatedString = z.string().refine(
    (val) => {
      // Check if the string is separated by commas
      return val.split(",").every((str) => str.trim().length > 0);
    },
    {
      message:
        "String must be separated by commas and not contain empty values",
    }
  );

  const schema = z.object({
    title: z
      .string({ required_error: "title is required" })
      .min(3, "Title should be of minimum 3 characters"),
    description: z
      .string({ required_error: "Description is required" })
      .min(3, "Description should be of minimum 3 characters"),
    repoLink: z
      .string({ required_error: "Repository link is required" })
      .url("Please provide valid url"),
    liveLink: z
      .string({ required_error: "Live link is required" })
      .url("Please provide valid url"),
    techStack: commaSeparatedString,
    domain: z
      .string({ required_error: "Please provide domain" })
      .min(2, "Domain should be minimum of 2 characters"),
    demoLink: z
      .string({ required_error: "Please provide demo link" })
      .url("Please provide valid url"),
    username: z
      .string({ required_error: "Please provide username" })
      .min(3, "Username should be of minimum 3 characters"),
    avatar: z
      .string({ required_error: "Avatar Link is required" })
      .url("Please provide valid url"),
    githubLink: z
      .string({ required_error: "GitHub profile link is required" })
      .url("Please provide valid url"),
    twitterLink: z
      .string({ required_error: "Twitter profile link is required" })
      .url("Please provide valid url"),
    linkedInLink: z
      .string({ required_error: "LinkedIn profile link is required" })
      .url("Please provide valid url"),
  });

  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const submitHandler: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const vscode = useRef(null);
  if (vscode.current === null) {
    vscode.current = acquireVsCodeApi();
  }

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
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-lg font-bold">
            Description
          </label>
          <textarea
            id="description"
            className="resize-none textarea textarea-bordered textarea-primary"
            placeholder="Enter project description"
            {...register("description")}
          ></textarea>
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
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="demoVideo" className="text-lg font-bold">
            Demo Video Link
          </label>
          <input
            id="demoVideo"
            type="url"
            placeholder="Enter demo video link"
            className="w-full input input-bordered input-primary"
            {...register("demoLink")}
          />
          {errors.demoLink && (
            <div className="mt-1 text-red-500">
              {String(errors.demoLink.message)}
            </div>
          )}
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
          <button className="btn bg-[#3b82f6] text-white w-fit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
