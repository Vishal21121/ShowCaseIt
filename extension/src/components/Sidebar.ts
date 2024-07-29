import * as vscode from "vscode";

export class MySidebarViewProvider implements vscode.WebviewViewProvider {
  // this is the id we have to write in view.showcaseit
  public static readonly viewType = "showcaseit.sidebarView";

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): Thenable<void> | void {
    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Sidebar</title>
      </head>
      <body>
        <h1>Hello from the Sidebar!</h1>
        <button>Hello</button>
      </body>
      `;
  }
}
