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
