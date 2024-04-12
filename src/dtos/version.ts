export type SemVerString =
  | `v${number}.${number}.${number}`
  | `v${number}.${number}.${number}-${string}`;
export type Version = SemVerString | { version: SemVerString; title: string };
