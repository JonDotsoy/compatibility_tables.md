# Tolling to make compatibility tables

This tool read a set of markdown files

**Example:**

```ts
import { createCompatibilityTable } from "@jondotsoy/compatibility_table";

await createCompatibilityTable({
  versions: ["v1.0.0", "v2.1.0", { version: "v2.4.0", title: "Next" }],
  pattern: "**/*.md",
  outFile: "./compatibility_table.md",
});
```

## API Documentations

Read the full documentation on [api](./docs/api/create-compatibility-table.md)
