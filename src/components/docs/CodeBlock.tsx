import { useMemo } from "react";
import { CopyButton } from "./codeblock/CopyButton";
import { highlightCode } from "./codeblock/highlight";
import type { CodeLanguage } from "./codeblock/types";

interface CodeBlockProps {
  children: string;
  language?: CodeLanguage;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  language = "typescript",
  showLineNumbers = false,
}: CodeBlockProps) {
  const highlighted = useMemo(
    () => highlightCode(language, children),
    [language, children],
  );

  return (
    <div className="relative group overflow-x-auto rounded border border-neutral-800 bg-[#111111] p-4 font-mono text-sm">
      <CopyButton code={children} />
      <div className={showLineNumbers ? "flex" : ""}>
        {showLineNumbers && (
          <div className="mr-4 select-none border-r border-neutral-800 pr-4 text-right">
            {children.split("\n").map((_, i) => (
              <div key={i} className="text-neutral-600">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <div>{highlighted}</div>
      </div>
    </div>
  );
}

export function BashCode({ children }: { children: string }) {
  return <CodeBlock language="bash">{children}</CodeBlock>;
}

export function TSCode({ children }: { children: string }) {
  return <CodeBlock language="typescript">{children}</CodeBlock>;
}

export function PythonCode({ children }: { children: string }) {
  return <CodeBlock language="python">{children}</CodeBlock>;
}

export function JSONCode({ children }: { children: string }) {
  return <CodeBlock language="json">{children}</CodeBlock>;
}

export function TOMLCode({ children }: { children: string }) {
  return <CodeBlock language="toml">{children}</CodeBlock>;
}
