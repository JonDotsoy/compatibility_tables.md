import type { LikePath } from "./likePath.js";
import type { Version } from "./version.js";

export type CreateCompatibilityTableOptions = {
  versions: Version[];
  /** Default use "**\/*.md" */
  pattern?: string;
  outFile?: LikePath;
};

export type CreateCompatibilityTable = (
  options: CreateCompatibilityTableOptions,
) => Promise<void>;
