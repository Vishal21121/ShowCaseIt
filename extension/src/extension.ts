// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode from "vscode";
import { MySidebarViewProvider } from "./components/Sidebar";
import { displayProjectForm } from "./components/ProjectForm";
import { renderProject } from "./components/ProjectRender";
import {
  createProjectDataType,
  githubUserData,
  updateProjectDataType,
} from "./types/projectData";
import { githubLogin } from "./utils/githubLogin";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  let currentProjectData:
    | updateProjectDataType
    | createProjectDataType
    | Object = {};
  let formType = "";
  const mySidebarProvider = new MySidebarViewProvider(
    context.extensionUri,
    context,
    currentProjectData,
    formType
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MySidebarViewProvider.viewType,
      mySidebarProvider
    )
  );

  // display webview for creating the project
  const projectCreateFormCommandHandler = () => {
    const panel = displayProjectForm(context, "Project Create Form");
    panel.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case "loaded":
          panel.webview.postMessage({
            command: mySidebarProvider.formType,
            data: mySidebarProvider.currentProjectData,
          });
          break;
        case "projectCreated":
          panel.dispose();
        case "projectUpdated":
          panel.dispose();
      }
    });
  };
  const projectCreateFormCommand = "showcaseit.projectForm";
  context.subscriptions.push(
    vscode.commands.registerCommand(
      projectCreateFormCommand,
      projectCreateFormCommandHandler
    )
  );

  // displayProjectForm for creating rendering the project
  const projectRenderCommandHandler = () => {
    const panel = renderProject(context, "Project Render");
    panel.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case "loaded":
          panel.webview.postMessage({
            command: "projectData",
            data: mySidebarProvider.currentProjectData,
          });
      }
    });
  };
  const projectRenderCommand = "showcaseit.projectRender";
  context.subscriptions.push(
    vscode.commands.registerCommand(
      projectRenderCommand,
      projectRenderCommandHandler
    )
  );

  // code for logging in the user
  const loginUser = vscode.commands.registerCommand(
    "showcaseit.loginUser",
    async () => {
      try {
        const userData = await githubLogin(context);
        if (userData) {
          // Display user data
          vscode.window.showInformationMessage(
            `Successfully authenticated as ${userData.login}`
          );
          context.globalState.update("userData", userData);
          mySidebarProvider.webviewViewContainer?.webview.postMessage({
            command: "loginUser",
            data: userData,
          });
        }
      } catch (error) {}
    }
  );
  context.subscriptions.push(loginUser);
}

// This method is called when your extension is deactivated
export function deactivate() {}
