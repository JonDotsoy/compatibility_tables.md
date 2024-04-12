# Compatibility Table

The `@jondotsoy/compatibility_table` module provide the `createCompatibilityTable` to compile the markdown files on a file with the compatibility table.

```ts
import { createCompatibilityTable } from "@jondotsoy/compatibility_table";

await createCompatibilityTable({
  versions: ["v1.0.0", "v2.1.0", { version: "v2.4.0", title: "Next" }],
  pattern: "**/*.md",
  outFile: "./compatibility_table.md",
});
```

**Output:**

```md
# Compatibility Table

| Description | v1.0.0 | v2.1.0 | Next |
| :---------- | :----: | :----: | :--: |
| Foo         |  Yes   |   No   | Yes  |
| Biz         |   No   |  Yes   | Yes  |
| Tar         |   No   |  Yes   | Yes  |
```

<!-- feature
compatibility: "*"
-->

## `createCompatibilityTable` function

<!-- feature
compatibility: "*"
-->

### `version` option to describe versions enabled

This options is obligatory to describe the `Compatibility Table`.

```ts
versions: ["v1.0.0", "v2.1.0", { version: "v2.4.0", title: "Next" }],
```

During the compilation the version options use this versions as columns to the compatibility table.

<!-- feature
compatibility: "*"
-->

### `pattern` option to match files

```ts
pattern: "**/*.md";
```

<!-- feature
compatibility: "*"
-->

### `cwd` option to choice the source

```ts
cwd: "./docs/api/";
```

<!-- feature
compatibility: "*"
-->

### `outFile` option to choice the destination

```ts
outFile: "./out.md";
```
