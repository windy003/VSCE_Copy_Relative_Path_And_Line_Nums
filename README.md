# Copy Relative Path and Line

A small Cursor/VS Code extension that copies the active editor's path relative to its workspace folder, followed by the current line number.

Example: `folder1/folder2/file3.py:56`

## Shortcut

`Ctrl+Shift+Alt+C`

The line number is 1-based and follows the active cursor position. On macOS, the shortcut is contributed as `Ctrl+Shift+Alt+C` as well.

## Install locally

1. Open this folder in Cursor.
2. Press `F5` to launch an Extension Development Host.
3. In the new window, focus a line in a saved file and press `Ctrl+Shift+Alt+C`.

To install as a VSIX, package the extension with `vsce package`, then install the generated `.vsix` from Cursor's Extensions view using **Install from VSIX...**.
