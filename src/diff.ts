import { execSync } from "child_process";
import * as vscode from "vscode";

export function getGitDiff(): string {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage("No workspace folder open");
    return "";
  }

  const rootPath = workspaceFolders[0].uri.fsPath;

  try {
    return execSync("git diff HEAD", {
      cwd: rootPath, // 🔥 THIS IS THE FIX
      encoding: "utf-8",
    });
  } catch (err) {
    console.error("Git diff failed", err);
    return "";
  }
}