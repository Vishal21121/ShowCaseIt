import vscode from "vscode";

function getWebViewContent(
  webview: vscode.Webview,
  cssURI: vscode.Uri,
  jsURI: vscode.Uri
) {
  const cspSource = webview.cspSource;
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React</title>
      <link rel="stylesheet" href=${cssURI}>
      </head>
      <body>
      <div id="root"></div>
      <script type="module" src=${jsURI}></script>
    </body>
  </html>
  `;
}

export function renderProject(context: vscode.ExtensionContext, title: string) {
  const panel = vscode.window.createWebviewPanel(
    "Project Render",
    title,
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.joinPath(
          context.extensionUri,
          "src",
          "views",
          "project render",
          "dist"
        ),
      ],
      enableFindWidget: true,
      enableForms: true,
    }
  );
  // Set the webview's options
  panel.webview.options = {
    enableScripts: true,
    localResourceRoots: [
      vscode.Uri.joinPath(
        context.extensionUri,
        "src",
        "views",
        "project render",
        "dist"
      ),
    ],
    enableForms: true,
  };

  const cssPath = vscode.Uri.joinPath(
    context.extensionUri,
    "src/views/project render/dist/index.css"
  );
  const cssURI = panel.webview.asWebviewUri(cssPath);

  const jsPath = vscode.Uri.joinPath(
    context.extensionUri,
    "src/views/project render/dist/index.js"
  );
  const jsURI = panel.webview.asWebviewUri(jsPath);

  panel.webview.html = getWebViewContent(panel.webview, cssURI, jsURI);
  return panel;
}
