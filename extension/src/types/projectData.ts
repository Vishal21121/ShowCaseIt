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

export type githubUserData = {
  avatar_url: string;
  bio: string;
  blog: string;
  collaborators: number;
  company: string | null;
  created_at: string;
  disk_usage: number;
  email: string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  notification_email: string;
  organizations_url: string;
  owned_private_repos: number;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
  private_gists: number;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  total_private_repos: number;
  twitter_username: string;
  two_factor_authentication: boolean;
  type: string;
  updated_at: string;
  url: string;
};
