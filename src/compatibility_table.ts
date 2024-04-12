import unindent from "@jondotsoy/unindent";
import { MarkdownFile } from "./markdown-file";
import type { CreateCompatibilityTable } from "./dtos/createCompatibilityTable";
import { Glob } from "glob";
import semver from "semver";
import fs from "fs/promises";

const tryFormat = async (payload: string) => {
  try {
    // @ts-ignore
    const prettier = await import("prettier");
    return prettier.format(payload, { parser: "markdown" });
  } catch {}
  return payload;
};

export const createCompatibilityTable: CreateCompatibilityTable = async (
  options,
) => {
  const cwd = new URL(`${options.cwd ?? process.cwd()}/`, "file:");
  const versions = options.versions.map((version) =>
    typeof version === "string" ? { version, title: version } : version,
  );

  const outFile = options.outFile ? new URL(options.outFile, cwd) : null;

  let body = unindent`
    # Compatibility Table
  `;

  for (const a of new Glob(options.pattern ?? "**/*.md", {
    cwd: cwd.pathname,
    ignore: [
      "node_modules/**",
      ".git/**",
      outFile ? [outFile.pathname] : [],
    ].flat(),
  })) {
    const markdownFile = await MarkdownFile.byLocation(new URL(a, cwd));

    const articles = markdownFile.toArticles();
    if (articles.length === 0) continue;

    body += unindent`
      ## ${markdownFile.getTitle()}

    `;

    body += unindent`
      | Description | ${versions.map((v) => v.title).join(" | ")} |
      | :-- | ${versions.map((v) => ":---:").join(" | ")} |
    `;

    articles.forEach((art) => {
      body += unindent`
        | ${art.title} | ${versions.map((v) => (semver.satisfies(v.version, art.compatibility) ? "Yes" : "")).join(" | ")} |
      `;
    });
  }

  const buffer = new TextEncoder().encode(await tryFormat(body));

  if (outFile) {
    await fs.writeFile(outFile, buffer);
  }

  return {
    buffer,
  };
};
