import * as vscode from "vscode";

function getUserData(context: vscode.ExtensionContext) {
  return context.globalState.get("userData");
}

export class MySidebarViewProvider implements vscode.WebviewViewProvider {
  // this is the id we have to write in view.showcaseit
  public static readonly viewType = "showcaseit.sidebarView";
  public webviewViewContainer: vscode.WebviewView | undefined;
  public vscodeContext: vscode.ExtensionContext;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _context: vscode.ExtensionContext
  ) {
    this._extensionUri = _extensionUri;
    this.vscodeContext = _context;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): Thenable<void> | void {
    vscode.ViewColumn.One;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    this.webviewViewContainer = webviewView;

    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case "loginUser":
          vscode.commands.executeCommand("showcaseit.loginUser");
          break;
        case "sendUserData":
          const userDataFromState = getUserData(this.vscodeContext);
          console.log(userDataFromState);
          if (userDataFromState) {
            console.log("sended");
            webviewView.webview.postMessage({
              command: "userData",
              data: userDataFromState,
            });
          }
          break;
        case "loadProjectForm":
          vscode.commands.executeCommand("showcaseit.projectForm");
      }
    });
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
