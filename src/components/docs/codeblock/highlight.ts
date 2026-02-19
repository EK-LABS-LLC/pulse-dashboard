import type { ReactNode } from "react";
import type { CodeLanguage } from "./types";
import { highlightBash } from "./tokenizers/bash";
import { highlightJSON } from "./tokenizers/json";
import { highlightPython } from "./tokenizers/python";
import { highlightTOML } from "./tokenizers/toml";
import { highlightTypeScript } from "./tokenizers/typescript";

export function highlightCode(
  language: CodeLanguage,
  source: string,
): ReactNode[] {
  switch (language) {
    case "python":
      return highlightPython(source);
    case "bash":
      return highlightBash(source);
    case "json":
      return highlightJSON(source);
    case "toml":
      return highlightTOML(source);
    case "typescript":
    default:
      return highlightTypeScript(source);
  }
}
