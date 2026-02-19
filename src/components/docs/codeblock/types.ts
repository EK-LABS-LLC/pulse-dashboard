import type { ReactNode } from "react";

export type CodeLanguage = "typescript" | "python" | "bash" | "json" | "toml";

export type HighlightColorKey =
  | "keyword"
  | "string"
  | "stringAlt"
  | "number"
  | "comment"
  | "function"
  | "variable"
  | "operator"
  | "punctuation"
  | "property"
  | "type"
  | "builtin"
  | "command"
  | "flag";

export type ColorMap = Record<HighlightColorKey, string>;

export type Highlighter = (code: string) => ReactNode[];
