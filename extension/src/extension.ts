// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode from "vscode";
import { MySidebarViewProvider } from "./components/Sidebar";
import { Credentials } from "./githubLogin/credentials";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  const mySidebarProvider = new MySidebarViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MySidebarViewProvider.viewType,
      mySidebarProvider
    )
  );

  const credentials = new Credentials();
  await credentials.initialize(context);

  const loginUser = vscode.commands.registerCommand(
    "showcaseit.loginUser",
    async () => {
      const octokit = await credentials.getOctokit();
      const userInfo = await octokit.users.getAuthenticated();
      if (userInfo.status === 200) {
        console.log(userInfo.data);
      }

      vscode.window.showInformationMessage(
        `Logged into GitHub as ${userInfo.data.login}`
      );
    }
  );

  context.subscriptions.push(loginUser);
}

// This method is called when your extension is deactivated
export function deactivate() {}
