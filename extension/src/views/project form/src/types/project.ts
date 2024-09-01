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

export type FormFields = z.infer<typeof schema>;
