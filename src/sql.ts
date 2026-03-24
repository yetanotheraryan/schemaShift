import { FieldChange } from "./parser";

function mapType(tsType: string): string {
  switch (tsType) {
    case "number":
      return "INT";
    case "string":
      return "TEXT";
    case "boolean":
      return "BOOLEAN";
    default:
      return "TEXT";
  }
}

export function generateSQL(
  table: string,
  addedFields: FieldChange[]
): string {
  if (addedFields.length === 0) {
    return "-- No changes detected";
  }

  return addedFields
    .map(
      (f) =>
        `ALTER TABLE ${table} ADD COLUMN ${f.field} ${mapType(f.type)};`
    )
    .join("\n");
}