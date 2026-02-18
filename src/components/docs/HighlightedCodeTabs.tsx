import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

interface HighlightedCodeTabsProps {
  ts: string;
  py: string;
}

export function HighlightedCodeTabs({ ts, py }: HighlightedCodeTabsProps) {
  const [active, setActive] = useState<"ts" | "py">("ts");

  return (
    <div>
      <div className="flex border-b border-neutral-800">
        <button
          onClick={() => setActive("ts")}
          className={`px-4 py-2.5 font-mono text-xs font-medium transition-colors ${
            active === "ts"
              ? "text-white border-b border-white -mb-px"
              : "text-neutral-500 hover:text-neutral-400"
          }`}
        >
          TypeScript
        </button>
        <button
          onClick={() => setActive("py")}
          className={`px-4 py-2.5 font-mono text-xs font-medium transition-colors ${
            active === "py"
              ? "text-white border-b border-white -mb-px"
              : "text-neutral-500 hover:text-neutral-400"
          }`}
        >
          Python
        </button>
      </div>
      <div>
        {active === "ts" ? (
          <CodeBlock language="typescript">{ts}</CodeBlock>
        ) : (
          <CodeBlock language="python">{py}</CodeBlock>
        )}
      </div>
    </div>
  );
}
