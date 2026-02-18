interface InlineCodeProps {
  children: string;
  variant?: "default" | "muted" | "highlight";
}

export function InlineCode({ children, variant = "default" }: InlineCodeProps) {
  const baseClasses =
    "font-mono text-[0.9em] px-1.5 py-0.5 rounded bg-neutral-800/50 border border-neutral-700/50";

  const variantClasses = {
    default: "text-neutral-300",
    muted: "text-neutral-500",
    highlight: "text-violet-400",
  };

  return (
    <code className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </code>
  );
}
