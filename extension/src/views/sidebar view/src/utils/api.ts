import axios from "axios";

async function getUserPost(username: string) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/project/get?username=${username}`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.status === 500) {
      throw new Error("Internal server error");
    } else if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.data.message);
    } else if (axios.isAxiosError(error) && error.request) {
      throw new Error("Network error: No response received");
    }
    return error;
  }
}

async function getInfiniteProjects({ pageParam }: { pageParam: number }) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/project/filter?page=${pageParam}&limit=10`
    );
    return response.data.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 500
    ) {
      throw new Error("Internal server error");
    } else if (axios.isAxiosError(error) && error.response) {
      console.log("error:", error.response.data);
      throw new Error(error.response.data.data.message);
    } else if (axios.isAxiosError(error) && error.request) {
      throw new Error("Network error: No response received");
    }
  }
}

async function deleteProject(id: string) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/project/delete`,
      {
        data: {
          id,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else if (axios.isAxiosError(error) && error.request) {
      throw new Error("Network error: No response received");
    }
    return error;
  }
}

async function updateWatchedOrLikes(
  field: string,
  id: string,
  userLiked?: string
) {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/project/increment`,
      {
        field,
        id,
        userLiked,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else if (axios.isAxiosError(error) && error.request) {
      throw new Error("Network error: No response received");
    }
    return error;
  }
}

export {
  getUserPost,
  getInfiniteProjects,
  deleteProject,
  updateWatchedOrLikes,
};
