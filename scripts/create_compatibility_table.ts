import { createCompatibilityTable } from "../src/index.js";

await createCompatibilityTable({
  cwd: new URL("../", import.meta.url),
  versions: [{ version: "v0.1.0", title: "latest" }],
  outFile: new URL("../docs/compatibility_table.md", import.meta.url),
});
