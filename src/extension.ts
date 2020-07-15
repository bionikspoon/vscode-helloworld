// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode"

const cats = {
  "Coding Cat": "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "Compiling Cat": "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vscode-helloworld" is now active!'
  )

  const disposable = vscode.commands.registerCommand("catCoding.start", () => {
    const panel = vscode.window.createWebviewPanel(
      "catCoding",
      "Cat Coding",
      vscode.ViewColumn.One,
      {}
    )

    panel.webview.html = webViewContent("Coding Cat")
    let iteration = 0
    const renderWebView = (): void => {
      const cat: keyof typeof cats =
        iteration++ % 2 === 0 ? "Coding Cat" : "Compiling Cat"
      panel.title = cat
      panel.webview.html = webViewContent(cat)
    }

    renderWebView()

    const interval = setInterval(renderWebView, 1000)

    panel.onDidDispose(
      () => {
        clearInterval(interval)
      },
      null,
      context.subscriptions
    )
  })

  context.subscriptions.push(disposable)
}

function webViewContent(cat: keyof typeof cats): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cat Coding</title>
</head>
<body>
  <img src="${cats[cat]}" width="300" />
</body>
</html>
`
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
