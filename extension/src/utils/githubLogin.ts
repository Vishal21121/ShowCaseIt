import vscode from "vscode";
import { githubUserData } from "../types/projectData";

const githubLogin = async (context: vscode.ExtensionContext) => {
  try {
    const session = await vscode.authentication.getSession("github", ["user"], {
      createIfNone: true,
    });
    if (session) {
      // Use the access token from the session
      const accessToken = session.accessToken;

      // Store the token securely if needed
      await context.secrets.store("githubToken", accessToken);

      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "VSCode Extension",
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
      }

      const user = (await response.json()) as githubUserData;
      return user;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export { githubLogin };
