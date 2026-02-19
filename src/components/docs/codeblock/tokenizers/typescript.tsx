import type { ReactNode } from "react";
import { colors } from "../colors";

export function highlightTypeScript(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, i) => {
    const tokens: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      if (remaining.startsWith("//")) {
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

      if (remaining.startsWith("`")) {
        let end = 1;
        while (end < remaining.length && remaining[end] !== "`") {
          if (remaining[end] === "\\") end++;
          end++;
        }
        tokens.push(
          <span key={key++} className={colors.string}>
            {remaining.slice(0, end + 1)}
          </span>,
        );
        remaining = remaining.slice(end + 1);
        continue;
      }

      const keywords = [
        "import",
        "export",
        "from",
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "class",
        "interface",
        "type",
        "enum",
        "new",
        "this",
        "super",
        "extends",
        "implements",
        "async",
        "await",
        "try",
        "catch",
        "throw",
        "typeof",
        "instanceof",
        "in",
        "of",
        "true",
        "false",
        "null",
        "undefined",
        "void",
        "never",
        "any",
        "string",
        "number",
        "boolean",
        "as",
        "is",
        "keyof",
        "readonly",
        "public",
        "private",
        "protected",
        "static",
        "get",
        "set",
        "default",
        "switch",
        "case",
        "break",
        "continue",
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
        "console",
        "Promise",
        "Array",
        "Object",
        "String",
        "Number",
        "Boolean",
        "JSON",
        "Math",
        "Date",
        "Error",
        "Map",
        "Set",
        "WeakMap",
        "WeakSet",
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

      const funcMatch = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
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
      if (numMatch && !remaining.match(/^-?\d+\.?\d*[a-zA-Z_$]/)) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      const propMatch = remaining.match(/^\.([a-zA-Z_$][a-zA-Z0-9_$]*)/);
      if (propMatch) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            .
          </span>,
        );
        tokens.push(
          <span key={key++} className={colors.property}>
            {propMatch[1]}
          </span>,
        );
        remaining = remaining.slice(propMatch[0].length);
        continue;
      }

      const varMatch = remaining.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
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
        /^(=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||<<|>>|>>>|\?\?|\?\.|\.\.\.|[+\-*/%&|^~<>!=?])/,
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

      if (remaining.startsWith("[") || remaining.startsWith("]")) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            {remaining[0]}
          </span>,
        );
        remaining = remaining.slice(1);
        continue;
      }

      const punctMatch = remaining.match(/^[{}();:,.\s]/);
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
