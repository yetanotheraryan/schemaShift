export type FieldChange = {
  field: string;
  type: string;
};

export function extractAddedFields(diff: string): FieldChange[] {
  const results: FieldChange[] = [];

  // Match lines like: + "newcol": {   OR   + newcol: {
  const fieldRegex = /^\+\s*["']?(\w+)["']?\s*:\s*{/gm;

  let match: RegExpExecArray | null;

  while ((match = fieldRegex.exec(diff)) !== null) {
    const field = match[1];

    // Look ahead from this position to find the type inside the block
    const startIndex = match.index;

    // Slice next ~200 chars (enough for small field blocks)
    const snippet = diff.slice(startIndex, startIndex + 200);

    const typeMatch = snippet.match(/type:\s*DataTypes\.(\w+)/);

    if (typeMatch) {
      results.push({
        field,
        type: typeMatch[1],
      });
    }
  }

  return results;
}