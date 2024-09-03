export type UserDetails = {
  avatar: string;
  gitHub: string;
  linkedIn: string | null;
  twitter: string | null;
  username: string;
};

export type ProjectData = {
  _id: string;
  createdAt: string;
  demoVideo: string;
  description: string;
  domain: string;
  likes: number;
  liveLink: string;
  repoLink: string;
  techStack: string[];
  title: string;
  updatedAt: string;
  userDetails: UserDetails;
  watched: number;
};

export type CardData = {
  _id: string;
  title: string;
  watched: number;
  likes: number;
  avatar: string;
  username: string;
  techStack: string[];
  domain: string;
};
