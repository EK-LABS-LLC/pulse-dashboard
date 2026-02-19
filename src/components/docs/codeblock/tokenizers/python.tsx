import type { ReactNode } from "react";
import { colors } from "../colors";

export function highlightPython(code: string): ReactNode[] {
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

      const keywords = [
        "import",
        "from",
        "def",
        "class",
        "return",
        "if",
        "elif",
        "else",
        "for",
        "while",
        "in",
        "not",
        "and",
        "or",
        "is",
        "as",
        "with",
        "try",
        "except",
        "finally",
        "raise",
        "assert",
        "pass",
        "break",
        "continue",
        "True",
        "False",
        "None",
        "lambda",
        "yield",
        "global",
        "nonlocal",
        "async",
        "await",
        "match",
        "case",
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

      const builtins = [
        "print",
        "len",
        "range",
        "str",
        "int",
        "float",
        "bool",
        "list",
        "dict",
        "set",
        "tuple",
        "type",
        "isinstance",
        "hasattr",
        "getattr",
        "setattr",
        "open",
        "self",
        "cls",
      ];
      const builtinMatch = remaining.match(
        new RegExp(`^(${builtins.join("|")})\\b`),
      );
      if (builtinMatch) {
        tokens.push(
          <span key={key++} className={colors.builtin}>
            {builtinMatch[0]}
          </span>,
        );
        remaining = remaining.slice(builtinMatch[0].length);
        continue;
      }

      const funcMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
      if (funcMatch) {
        tokens.push(
          <span key={key++} className={colors.function}>
            {funcMatch[1]}
          </span>,
        );
        remaining = remaining.slice(funcMatch[1].length);
        continue;
      }

      const numMatch = remaining.match(/^-?\d+\.?\d*/);
      if (numMatch && !remaining.match(/^-?\d+\.?\d*[a-zA-Z_]/)) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      if (remaining.startsWith("@")) {
        const decMatch = remaining.match(/^@[a-zA-Z_][a-zA-Z0-9_]*/);
        if (decMatch) {
          tokens.push(
            <span key={key++} className={colors.function}>
              {decMatch[0]}
            </span>,
          );
          remaining = remaining.slice(decMatch[0].length);
          continue;
        }
      }

      const varMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (varMatch) {
        tokens.push(
          <span key={key++} className={colors.variable}>
            {varMatch[0]}
          </span>,
        );
        remaining = remaining.slice(varMatch[0].length);
        continue;
      }

      const opMatch = remaining.match(
        /^(==|!=|<=|>=|:=|->|\*\*|\/\/|and|or|not|in|is|[+\-*/%&|^~<>=])/,
      );
      if (opMatch) {
        tokens.push(
          <span key={key++} className={colors.operator}>
            {opMatch[0]}
          </span>,
        );
        remaining = remaining.slice(opMatch[0].length);
        continue;
      }

      const punctMatch = remaining.match(/^[{}()[\];:,.=\\\s]/);
      if (punctMatch) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            {punctMatch[0]}
          </span>,
        );
        remaining = remaining.slice(1);
        continue;
      }

      tokens.push(
        <span key={key++} className={colors.variable}>
          {remaining[0]}
        </span>,
      );
      remaining = remaining.slice(1);
    }

    return <div key={i}>{tokens}</div>;
  });
}
