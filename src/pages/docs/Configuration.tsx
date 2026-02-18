import { HighlightedCodeTabs, InlineCode } from "../../components/docs";

export default function Configuration() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-2">
          Getting Started
        </div>
        <h1
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
        >
          Configuration
        </h1>
        <p className="text-neutral-500 text-[15px]">
          All options for <InlineCode>initPulse()</InlineCode>.
        </p>
      </div>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          initPulse(config)
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Call once at application startup before any{" "}
          <InlineCode>observe()</InlineCode> calls.
        </p>
        <HighlightedCodeTabs
          ts={`import { initPulse } from '@pulse/sdk';

initPulse({
  apiKey: 'pulse_sk_...',
  apiUrl: 'https://pulse.yourcompany.com',
  batchSize: 20,
  flushInterval: 10000,
  enabled: process.env.NODE_ENV === 'production',
});`}
          py={`import os
from pulse_sdk import init_pulse

init_pulse({
  "api_key": "pulse_sk_...",
  "api_url": "https://pulse.yourcompany.com",
  "batch_size": 20,
  "flush_interval": 10000,
  "enabled": os.environ.get("ENV") == "production",
})`}
        />
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Options
        </h2>
        <div className="space-y-4">
          {[
            {
              name: "apiKey",
              type: "string",
              required: true,
              desc: "Your Pulse API key. Must start with pulse_sk_.",
            },
            {
              name: "apiUrl",
              type: "string",
              required: false,
              desc: "Pulse server URL. Default: http://localhost:3000",
            },
            {
              name: "batchSize",
              type: "number",
              required: false,
              desc: "Number of traces to buffer before flushing. Range: 1-100. Default: 10",
            },
            {
              name: "flushInterval",
              type: "number",
              required: false,
              desc: "Milliseconds between periodic flushes. Minimum: 1000. Default: 5000",
            },
            {
              name: "enabled",
              type: "boolean",
              required: false,
              desc: "Enable or disable tracing. Useful for disabling in tests or dev. Default: true",
            },
          ].map((p) => (
            <div key={p.name} className="border border-neutral-800 p-4">
              <div className="flex items-center gap-2 mb-1">
                <code className="font-mono text-sm text-white">{p.name}</code>
                <span className="text-xs text-neutral-600 font-mono">{p.type}</span>
                {p.required && (
                  <span className="text-xs text-amber-500/80 font-medium">required</span>
                )}
              </div>
              <p className="text-sm text-neutral-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Batching behavior
        </h2>
        <p className="text-sm text-neutral-500 mb-3">
          Traces are buffered in memory and sent to the server in two situations:
        </p>
        <ul className="text-sm text-neutral-500 space-y-1.5 list-disc pl-5">
          <li>
            The buffer reaches <InlineCode>batchSize</InlineCode> — flushes
            immediately
          </li>
          <li>
            The <InlineCode>flushInterval</InlineCode> timer fires — flushes
            whatever is buffered
          </li>
        </ul>
        <p className="text-sm text-neutral-500 mt-3">
          On process exit (<InlineCode>beforeExit</InlineCode>,{" "}
          <InlineCode>SIGINT</InlineCode>,{" "}
          <InlineCode>SIGTERM</InlineCode>), the SDK flushes all remaining
          traces before shutdown.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Validation
        </h2>
        <p className="text-sm text-neutral-500 mb-3">
          <InlineCode>initPulse()</InlineCode> validates all config values at
          startup:
        </p>
        <ul className="text-sm text-neutral-500 space-y-1.5 list-disc pl-5">
          <li>
            <InlineCode>apiKey</InlineCode> must be a non-empty string
            starting with <InlineCode>pulse_sk_</InlineCode>
          </li>
          <li>
            <InlineCode>batchSize</InlineCode> must be an integer between 1
            and 100
          </li>
          <li>
            <InlineCode>flushInterval</InlineCode> must be at least 1000ms
          </li>
        </ul>
        <p className="text-sm text-neutral-500 mt-3">
          Invalid values throw immediately so you catch misconfiguration early.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Disabling tracing
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Set <InlineCode>enabled: false</InlineCode> to turn off all
          tracing. The <InlineCode>observe()</InlineCode> wrapper still
          returns a working client — it just skips trace capture.
        </p>
        <HighlightedCodeTabs
          ts={`initPulse({
  apiKey: 'pulse_sk_...',
  enabled: false, // No traces sent
});`}
          py={`init_pulse({
  "api_key": "pulse_sk_...",
  "enabled": False,  # No traces sent
})`}
        />
      </section>
    </div>
  );
}
