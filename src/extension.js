const vscode = require('vscode');
const path = require('path');

function activate(context) {
  const command = vscode.commands.registerCommand('copyRelativePathLine.copy', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('没有活动的编辑器。');
      return;
    }

    const document = editor.document;
    if (document.isUntitled) {
      vscode.window.showInformationMessage('请先保存文件，再复制路径和行号。');
      return;
    }

    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    let relativePath;
    if (workspaceFolder) {
      relativePath = path.relative(workspaceFolder.uri.fsPath, document.uri.fsPath);
    } else {
      // If the file is outside all workspace folders, use its file name as a useful fallback.
      relativePath = path.basename(document.uri.fsPath);
    }

    // Always use forward slashes so the copied path is portable across platforms.
    relativePath = relativePath.split(path.sep).join('/');
    // selection.start/end are normalized, so this works regardless of drag direction.
    const { start, end } = editor.selection;
    let firstLine = start.line + 1;
    let lastLine = end.line + 1;
    // A selection that stops at column 0 of the next line doesn't really include that line.
    if (lastLine > firstLine && end.character === 0) {
      lastLine -= 1;
    }
    const lineRange = firstLine === lastLine ? `${firstLine}` : `${firstLine}-${lastLine}`;
    const result = `${relativePath}:${lineRange}`;

    await vscode.env.clipboard.writeText(result);
    vscode.window.setStatusBarMessage(`已复制: ${result}`, 2500);
  });

  context.subscriptions.push(command);
}

function deactivate() {}

module.exports = { activate, deactivate };
