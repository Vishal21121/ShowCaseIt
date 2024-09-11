import { z } from "zod";

const commaSeparatedString = z.string().refine(
  (val) => {
    // Check if the string is separated by commas
    return val.split(",").every((str) => str.trim().length > 0);
  },
  {
    message: "String must be separated by commas and not contain empty values",
  }
);

export const schema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(3, "Title should be of minimum 3 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, "Description should be of minimum 3 characters"),
  repoLink: z
    .string({ required_error: "Repository link is required" })
    .url("Please provide valid url"),
  liveLink: z.union([
    z.string().url({ message: "Please Provide a valid url" }).nullish(),
    z.literal(""),
  ]),
  techStack: commaSeparatedString,
  domain: z
    .string({ required_error: "Please provide domain" })
    .min(2, "Domain should be minimum of 2 characters"),
  username: z
    .string({ required_error: "Please provide username" })
    .min(3, "Username should be of minimum 3 characters"),
  avatar: z
    .string({ required_error: "Avatar Link is required" })
    .url("Please provide valid url"),
  githubLink: z
    .string({ required_error: "GitHub profile link is required" })
    .url("Please provide valid url"),
  twitterLink: z.union([
    z.string().url({ message: "Please Provide a valid url" }).nullish(),
    z.literal(""),
  ]),
  linkedInLink: z.union([
    z.string().url({ message: "Please Provide a valid url" }).nullish(),
    z.literal(""),
  ]),
});

export type UserDetails = {
  avatar: string;
  gitHub: string;
  linkedIn: string;
  twitter: string;
  username: string;
};

export type updateProjectDataType = {
  id: string;
  createdAt: string;
  description: string;
  domain: string;
  likes: number;
  likedUsers: string[];
  liveLink: string;
  repoLink: string;
  techStack: string[];
  title: string;
  updatedAt: string;
  userDetails: UserDetails;
  watched: number;
};

export type createProjectDataType = {
  avatar: string;
  gitHub: string;
  username: string;
};

export type FormFields = z.infer<typeof schema>;

export type updateProjectData = {
  id: string;
  title: string;
  description: string;
  liveLink: string | null | undefined;
  techStack: string[];
};
