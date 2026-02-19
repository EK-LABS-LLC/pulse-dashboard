import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { CodeBlock } from "./CodeBlock";

interface HighlightedCodeTabsProps {
  ts: string;
  py: string;
}

export function HighlightedCodeTabs({ ts, py }: HighlightedCodeTabsProps) {
  const [active, setActive] = useState<"ts" | "py">("ts");
  const tabListId = useId();
  const tabs: Array<{ id: "ts" | "py"; label: string }> = [
    { id: "ts", label: "TypeScript" },
    { id: "py", label: "Python" },
  ];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.id === active);
    if (index < 0) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActive(tabs[(index + 1) % tabs.length].id);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActive(tabs[(index - 1 + tabs.length) % tabs.length].id);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActive(tabs[0].id);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActive(tabs[tabs.length - 1].id);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Code examples"
        id={tabListId}
        onKeyDown={onKeyDown}
        className="flex border-b border-neutral-800"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`${tabListId}-${tab.id}-tab`}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`${tabListId}-${tab.id}-panel`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            className={`-mb-px border-b px-4 py-2.5 font-mono text-xs font-medium transition-colors ${
              active === tab.id
                ? "border-white text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${tabListId}-${active}-panel`}
        aria-labelledby={`${tabListId}-${active}-tab`}
      >
        {active === "ts" ? (
          <CodeBlock language="typescript">{ts}</CodeBlock>
        ) : (
          <CodeBlock language="python">{py}</CodeBlock>
        )}
      </div>
    </div>
  );
}
