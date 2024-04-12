import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

export const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkStringify);
