import axios, { AxiosError } from "axios";
import { FormFields, updateProjectData } from "../types/project";

async function createProject(data: FormFields) {
  const techStack = data.techStack.split(",");
  const body = {
    title: data.title,
    description: data.description,
    repoLink: data.repoLink,
    liveLink: data.liveLink,
    techStack,
    domain: data.domain,
    userDetails: {
      username: data.username,
      avatar: data.avatar,
      github: data.githubLink,
      twitter: data.twitterLink,
      linkedIn: data.linkedInLink,
    },
  };
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/project/create`,
      body
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Server responded with a status other than 200 range
      console.error(
        "Server Error:",
        error.response.status,
        error.response.data
      );
      if (error.response.status === 500) {
        throw new Error("Internal server error");
      }
      throw new Error(error.response.data.data.errors[0]);
    } else if (axios.isAxiosError(error) && error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
    } else {
      // Something else happened
      console.error("Error:", (error as AxiosError).message);
    }
    return error;
  }
}

async function updateProject(updateData: updateProjectData) {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/project/update`,
      {
        ...updateData,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 422) {
        throw new Error(error.response.data.data.errors[0]);
      } else if (error.response.status === 500) {
        throw new Error("Internal server error");
      }
    }
  }
}

export { createProject, updateProject };
