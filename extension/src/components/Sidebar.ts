import * as vscode from "vscode";

export class MySidebarViewProvider implements vscode.WebviewViewProvider {
  // this is the id we have to write in view.showcaseit
  public static readonly viewType = "showcaseit.sidebarView";

  constructor(private readonly _extensionUri: vscode.Uri) {
    this._extensionUri = _extensionUri;
  }

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
    const cssPath = vscode.Uri.joinPath(
      this._extensionUri,
      "src/views/sidebar view/dist/index.css"
    );
    const cssSrc = webview.asWebviewUri(cssPath);
    const jsPath = vscode.Uri.joinPath(
      this._extensionUri,
      "src/views/sidebar view/dist/index.js"
    );
    const jsSrc = webview.asWebviewUri(jsPath);
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Sidebar</title>
        <link rel="stylesheet" href=${cssSrc}>
      </head>
      <body style="padding: 0">
        <div id="root"></div>
        <script type="module" src=${jsSrc}></script>
      </body>
      `;
  }
}
