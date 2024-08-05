// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode from "vscode";
import { MySidebarViewProvider } from "./components/Sidebar";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const mySidebarProvider = new MySidebarViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MySidebarViewProvider.viewType,
      mySidebarProvider
    )
  );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("showcaseit.refresh", () => {
  //     // Implement your refresh logic here
  //     vscode.window.showInformationMessage("Refresh command executed");
  //   })
  // );
}

// This method is called when your extension is deactivated
export function deactivate() {}
