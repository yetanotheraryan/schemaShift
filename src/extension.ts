// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getGitDiff } from './diff';
import { extractAddedFields } from './parser';
import { generateSQL } from './sql';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	  const disposable = vscode.commands.registerCommand(
    "schemashift.generateMigration",
    async () => {
      const tableName = await vscode.window.showInputBox({
        prompt: "Enter table name",
        placeHolder: "users",
      });

      if (!tableName) return;

      const diff = getGitDiff();
	  console.log("Git Diff STart ------------:");
	  console.log("Git Diff:", diff);
	  console.log("Git Diff end ------------:");

      const addedFields = extractAddedFields(diff);
      const sql = generateSQL(tableName, addedFields);

      // Show result
      const doc = await vscode.workspace.openTextDocument({
        content: sql,
        language: "sql",
      });

      vscode.window.showTextDocument(doc);
    }
  );

  context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
