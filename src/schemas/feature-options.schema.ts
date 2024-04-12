import { z } from "zod";

export const featureOptionsSchema = z
  .object({
    compatibility: z.string().optional().describe("Semver format"),
  })
  .describe("Feature Metadata");
