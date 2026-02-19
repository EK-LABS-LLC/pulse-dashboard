import type { ReactNode } from "react";
import { colors } from "../colors";

export function highlightBash(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, i) => {
    const tokens: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      if (remaining.startsWith("#")) {
        tokens.push(
          <span key={key++} className={colors.comment}>
            {remaining}
          </span>,
        );
        break;
      }

      const stringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (stringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {stringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      const singleStringMatch = remaining.match(/^'([^'\\]|\\.)*'/);
      if (singleStringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {singleStringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(singleStringMatch[0].length);
        continue;
      }

      const flagMatch = remaining.match(/^--?[a-zA-Z0-9_-]+/);
      if (flagMatch) {
        tokens.push(
          <span key={key++} className={colors.flag}>
            {flagMatch[0]}
          </span>,
        );
        remaining = remaining.slice(flagMatch[0].length);
        continue;
      }

      const commands = [
        "pulse",
        "cargo",
        "npm",
        "yarn",
        "pnpm",
        "bun",
        "git",
        "docker",
        "kubectl",
        "make",
        "pip",
        "python",
        "node",
        "export",
        "source",
        "echo",
        "cd",
        "ls",
        "cat",
        "mkdir",
        "rm",
        "cp",
        "mv",
        "chmod",
        "curl",
        "wget",
      ];
      const cmdMatch = remaining.match(
        new RegExp(`^(${commands.join("|")})\\b`),
      );
      if (cmdMatch) {
        tokens.push(
          <span key={key++} className={colors.command}>
            {cmdMatch[0]}
          </span>,
        );
        remaining = remaining.slice(cmdMatch[0].length);
        continue;
      }

      const keywords = [
        "if",
        "then",
        "else",
        "fi",
        "for",
        "do",
        "done",
        "while",
        "until",
        "case",
        "esac",
        "function",
        "return",
        "exit",
        "true",
        "false",
      ];
      const keywordMatch = remaining.match(
        new RegExp(`^(${keywords.join("|")})\\b`),
      );
      if (keywordMatch) {
        tokens.push(
          <span key={key++} className={colors.keyword}>
            {keywordMatch[0]}
          </span>,
        );
        remaining = remaining.slice(keywordMatch[0].length);
        continue;
      }

      const varMatch = remaining.match(/^\$\{?[a-zA-Z_][a-zA-Z0-9_]*\}?/);
      if (varMatch) {
        tokens.push(
          <span key={key++} className={colors.variable}>
            {varMatch[0]}
          </span>,
        );
        remaining = remaining.slice(varMatch[0].length);
        continue;
      }

      const numMatch = remaining.match(/^-?\d+\.?\d*/);
      if (numMatch) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      const pathMatch = remaining.match(
        /^(\/[a-zA-Z0-9_/.-]+|~\/[a-zA-Z0-9_/.-]+)/,
      );
      if (pathMatch) {
        tokens.push(
          <span key={key++} className={colors.stringAlt}>
            {pathMatch[0]}
          </span>,
        );
        remaining = remaining.slice(pathMatch[0].length);
        continue;
      }

      const opMatch = remaining.match(/^(&&|\|\||>>|<<|>|<|\||&|;|\\)/);
      if (opMatch) {
        tokens.push(
          <span key={key++} className={colors.operator}>
            {opMatch[0]}
          </span>,
        );
        remaining = remaining.slice(opMatch[0].length);
        continue;
      }

      const wordMatch = remaining.match(/^[a-zA-Z0-9_.-]+/);
      if (wordMatch) {
        tokens.push(
          <span key={key++} className={colors.variable}>
            {wordMatch[0]}
          </span>,
        );
        remaining = remaining.slice(wordMatch[0].length);
        continue;
      }

      tokens.push(
        <span key={key++} className={colors.punctuation}>
          {remaining[0]}
        </span>,
      );
      remaining = remaining.slice(1);
    }

    return <div key={i}>{tokens}</div>;
  });
}
