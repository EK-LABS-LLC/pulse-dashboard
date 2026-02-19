import type { ReactNode } from "react";
import { colors } from "../colors";

export function highlightJSON(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, i) => {
    const tokens: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      const stringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (stringMatch) {
        const afterString = remaining.slice(stringMatch[0].length).trim();
        const isKey = afterString.startsWith(":");
        tokens.push(
          <span key={key++} className={isKey ? colors.property : colors.string}>
            {stringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      const numMatch = remaining.match(/^-?\d+\.?\d*([eE][+-]?\d+)?/);
      if (numMatch) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      const boolMatch = remaining.match(/^(true|false|null)\b/);
      if (boolMatch) {
        tokens.push(
          <span key={key++} className={colors.keyword}>
            {boolMatch[0]}
          </span>,
        );
        remaining = remaining.slice(boolMatch[0].length);
        continue;
      }

      const punctMatch = remaining.match(/^[{}[\]:,]/);
      if (punctMatch) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            {punctMatch[0]}
          </span>,
        );
        remaining = remaining.slice(1);
        continue;
      }

      const wsMatch = remaining.match(/^\s+/);
      if (wsMatch) {
        tokens.push(<span key={key++}>{wsMatch[0]}</span>);
        remaining = remaining.slice(wsMatch[0].length);
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
