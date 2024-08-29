import vscode from "vscode";

function getWebViewContent(cssURI: vscode.Uri, jsURI: vscode.Uri) {
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

export function displayProjectForm(
  context: vscode.ExtensionContext,
  title: string
) {
  const panel = vscode.window.createWebviewPanel(
    "Form",
    title,
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );
  const cssPath = vscode.Uri.joinPath(
    context.extensionUri,
    "src/views/project form/dist/index.css"
  );
  const cssURI = panel.webview.asWebviewUri(cssPath);

  const jsPath = vscode.Uri.joinPath(
    context.extensionUri,
    "src/views/project form/dist/index.js"
  );
  const jsURI = panel.webview.asWebviewUri(jsPath);

  panel.webview.html = getWebViewContent(cssURI, jsURI);
  return panel;
}
