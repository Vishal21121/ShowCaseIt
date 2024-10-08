import { UseMutateFunction } from "@tanstack/react-query";

export type UserDetails = {
  avatar: string;
  gitHub: string;
  linkedIn: string | null;
  twitter: string | null;
  username: string;
};

export type ProjectData = {
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

export type CardData = {
  vscode: any;
  el: ProjectData;
  removePost?: (id: string) => void;
  updateMutate?: UseMutateFunction<
    any,
    Error,
    {
      field: string;
      id: string;
      userLiked?: string;
    },
    unknown
  >;
  userDeleteMutate?: UseMutateFunction<
    any,
    Error,
    {
      id: string;
    },
    unknown
  >;
};

export type ProjectField = "watched" | "likes";
