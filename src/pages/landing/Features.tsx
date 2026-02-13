const features = [
  {
    tag: "Tracing",
    title: "End-to-end trace capture",
    desc: "Every prompt, completion, token count, latency, and cost stored with full request and response bodies.",
  },
  {
    tag: "Sessions",
    title: "Session timelines",
    desc: "Group related calls into sessions. See full conversations or agent runs as a timeline.",
  },
  {
    tag: "Analytics",
    title: "Cost and usage tracking",
    desc: "Track spend per model, per project, per session. Catch cost spikes before they hit your bill.",
  },
  {
    tag: "Routing",
    title: "Provider agnostic",
    desc: "OpenAI, Anthropic, OpenRouter. One SDK, consistent metrics across all providers.",
  },
  {
    tag: "Search",
    title: "Full-text search",
    desc: "Search across prompts and completions. Filter by model, status, cost, latency, or any metadata field.",
  },
  {
    tag: "Privacy",
    title: "Deploy anywhere",
    desc: "Run the full stack on your infrastructure. Docker Compose setup, Postgres backend, dashboard included.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 border-b border-neutral-800">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="max-w-[560px] mb-14">
          <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-4">
            Features
          </div>
          <h2
            className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
          >
            Everything you need to understand your LLM stack
          </h2>
          <p className="text-neutral-500 text-[15px] leading-relaxed">
            From individual traces to full session timelines, Pulse gives your team the visibility
            to ship with confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 border border-neutral-800 -mr-px -mb-px hover:border-neutral-700 transition-colors"
            >
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 mb-4">
                {f.tag}
              </div>
              <h3
                className="text-[1.1rem] font-semibold text-white mb-2.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
