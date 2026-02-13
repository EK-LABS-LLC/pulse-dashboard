import { useState, type ReactNode } from 'react';

interface CodeTabsProps {
  ts: ReactNode;
  py: ReactNode;
}

export function CodeTabs({ ts, py }: CodeTabsProps) {
  const [active, setActive] = useState<'ts' | 'py'>('ts');

  return (
    <div>
      <div className="flex border-b border-neutral-800">
        <button
          onClick={() => setActive('ts')}
          className={`px-4 py-2.5 font-mono text-xs font-medium transition-colors ${
            active === 'ts'
              ? 'text-white border-b border-white -mb-px'
              : 'text-neutral-500 hover:text-neutral-400'
          }`}
        >
          TypeScript
        </button>
        <button
          onClick={() => setActive('py')}
          className={`px-4 py-2.5 font-mono text-xs font-medium transition-colors ${
            active === 'py'
              ? 'text-white border-b border-white -mb-px'
              : 'text-neutral-500 hover:text-neutral-400'
          }`}
        >
          Python
        </button>
      </div>
      <div>{active === 'ts' ? ts : py}</div>
    </div>
  );
}
