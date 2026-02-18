import { Link } from "react-router-dom";

const docs = [
  {
    label: "Getting started",
    title: "Quickstart",
    desc: "Install the SDK, create an API key, and capture your first trace in under 5 minutes.",
    to: "/docs",
  },
  {
    label: "SDK",
    title: "Provider adapters",
    desc: "Integrate with OpenAI, Anthropic, and OpenRouter using the observe() wrapper.",
    to: "/docs/providers",
  },
  {
    label: "API",
    title: "REST API reference",
    desc: "Query traces, sessions, and analytics programmatically. Full endpoint documentation.",
    to: "/docs/api",
  },
  {
    label: "Concepts",
    title: "Sessions & metadata",
    desc: "Group traces with session IDs and attach custom metadata for filtering.",
    to: "/docs/sessions",
  },
  {
    label: "Config",
    title: "Configuration",
    desc: "Batching, flush intervals, disabling tracing, and all initPulse() options.",
    to: "/docs/config",
  },
];

export function DocsCards() {
  return (
    <section id="docs" className="py-24 border-b border-neutral-800">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="max-w-[560px] mb-14">
          <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-4">
            Documentation
          </div>
          <h2
            className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight text-white mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Everything you need to track your agent usage
          </h2>
          <p className="text-neutral-500 text-[15px] leading-relaxed">
            Guides, API reference, and examples to get you from zero to
            production.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {docs.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className="p-7 border border-neutral-800 -mr-px -mb-px flex flex-col gap-2.5 hover:border-neutral-700 transition-colors group"
            >
              <div className="font-mono text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                {d.label}
              </div>
              <h3
                className="text-base font-semibold text-white"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {d.title}
              </h3>
              <p className="text-[13px] text-neutral-500 flex-1 leading-relaxed">
                {d.desc}
              </p>
              <div className="text-[13px] font-medium text-neutral-600 group-hover:text-neutral-300 transition-colors">
                Read guide &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
