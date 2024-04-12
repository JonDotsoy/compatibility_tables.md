import YAML, { YAMLParseError } from "yaml";
import { markdownProcessor } from "./markdown-processor.js";
import { featureOptionsSchema } from "./schemas/feature-options.schema.js";
import type { Root } from "mdast";
import type { z } from "zod";
import path from "path";
import type { LikePath } from "./dtos/likePath.js";
import fs from "fs/promises";

export class MarkdownFile {
  constructor(
    readonly url: { toString(): string },
    readonly root: Root,
  ) {}

  getTitle() {
    const h =
      this.root.children.find(
        (child) => child.type === "heading" && child.depth === 1,
      ) ?? null;
    if (h?.type === "heading")
      return markdownProcessor
        .stringify({ type: "root", children: h.children })
        .trim();
    return null;
  }

  toArticles() {
    return this.root.children.flatMap((child, index, content) => {
      const isSection = child.type === "heading" && child.depth >= 2;
      if (!isSection) return [];
      const findMeta = () => {
        const child = content.at(index - 1);

        const bodyFeatureMetadata = (
          value: string | null,
        ): null | z.infer<typeof featureOptionsSchema> => {
          if (!value) return null;
          if (!value.startsWith("<!--")) return null;
          if (!value.endsWith("-->")) return null;
          const html_feature = /^(?<html_feature>\<\!--\s*feature\n)/.exec(
            value,
          )?.groups?.html_feature;
          if (!html_feature) return null;

          const metadata = value.substring(
            html_feature.length,
            value.length - 3,
          );

          try {
            return featureOptionsSchema.parse(YAML.parse(metadata));
          } catch (ex) {
            if (
              ex instanceof YAMLParseError &&
              ex.code === "UNEXPECTED_TOKEN"
            ) {
              throw ex;
            }
          }
          return null;
        };

        const featureMetadata = bodyFeatureMetadata(
          child?.type === "html" ? child.value : null,
        );

        if (!featureMetadata) return null;

        return featureMetadata;
      };
      const meta = findMeta();
      if (!meta) return [];

      const compatibility = meta.compatibility ? meta.compatibility : "?";

      const title = markdownProcessor
        .stringify({ type: "root", children: child.children })
        .trim();
      const ref = title
        .replace(/\W+/g, "-")
        .replace(/-$/, "")
        .toLowerCase()
        .trimEnd();

      return [
        {
          title,
          ref: (base: { toString(): string }) => {
            const relative = path.relative(
              new URL("./", base.toString()).pathname,
              new URL(this.url.toString()).pathname,
            );
            return `./${relative}#${ref}`;
          },
          compatibility,
        },
      ];
    });
  }

  static byLocation = async (urlLike: LikePath) => {
    const url = new URL(urlLike, "file:");
    const payload = await fs.readFile(url, "utf-8");
    const root: Root = markdownProcessor.parse(payload);
    return new MarkdownFile(url, root);
  };
}
