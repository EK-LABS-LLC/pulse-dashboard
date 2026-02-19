import type { ReactNode } from "react";
import { colors } from "../colors";

export function highlightTOML(code: string): ReactNode[] {
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

      const sectionMatch = remaining.match(/^\[[a-zA-Z0-9_.-]+\]/);
      if (sectionMatch) {
        tokens.push(
          <span key={key++} className={colors.function}>
            {sectionMatch[0]}
          </span>,
        );
        remaining = remaining.slice(sectionMatch[0].length);
        continue;
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

      const keyMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
      if (keyMatch) {
        tokens.push(
          <span key={key++} className={colors.property}>
            {keyMatch[1]}
          </span>,
        );
        remaining = remaining.slice(keyMatch[1].length);
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

      const boolMatch = remaining.match(/^(true|false)\b/);
      if (boolMatch) {
        tokens.push(
          <span key={key++} className={colors.keyword}>
            {boolMatch[0]}
          </span>,
        );
        remaining = remaining.slice(boolMatch[0].length);
        continue;
      }

      const punctMatch = remaining.match(/^[=.,]/);
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
