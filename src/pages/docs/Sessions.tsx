import { Link } from "react-router-dom";
import {
  HighlightedCodeTabs,
  CodeBlock,
  InlineCode,
} from "../../components/docs";

export default function Sessions() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-2">
          SDK
        </div>
        <h1
          className="text-3xl font-bold text-white mb-3"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Sessions & Metadata
        </h1>
        <p className="text-neutral-500 text-[15px]">
          Group traces into sessions and attach custom metadata.
        </p>
      </div>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Sessions
        </h2>
        <p className="text-sm text-neutral-500">
          A session groups related LLM calls together — a user conversation, an
          agent run, a batch job. Assign a session ID and all traces with that
          ID appear as a timeline in the dashboard.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Setting a session ID
        </h2>
        <h3 className="text-base font-medium text-neutral-300 mb-3">
          At observe-time
        </h3>
        <p className="text-sm text-neutral-500 mb-4">
          Pass <InlineCode>sessionId</InlineCode> in the options. All calls
          through this client use this session.
        </p>
        <HighlightedCodeTabs
          ts={`const client = observe(
  new OpenAI({ apiKey: 'sk-...' }),
  Provider.OpenAI,
  { sessionId: 'conv-abc-123' }
);`}
          py={`client = observe(
  OpenAI(api_key="sk-..."),
  Provider.OPENAI,
  { "session_id": "conv-abc-123" }
)`}
        />

        <h3 className="text-base font-medium text-neutral-300 mb-3 mt-6">
          Per-call override
        </h3>
        <p className="text-sm text-neutral-500 mb-4">
          Pass <InlineCode>pulseSessionId</InlineCode> in the request body to
          override the observe-time session for a specific call.
        </p>
        <HighlightedCodeTabs
          ts={`await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello' }],
  pulseSessionId: 'different-session-456',
});`}
          py={`client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Hello"}],
  pulse_session_id="different-session-456",
)`}
        />
        <p className="text-sm text-neutral-500 mt-3">
          Per-call takes precedence. The <InlineCode>pulseSessionId</InlineCode>{" "}
          param is stripped before the request reaches the provider.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Metadata
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Attach arbitrary key-value data to traces. Useful for filtering by
          user, feature, environment, or any dimension you care about.
        </p>

        <h3 className="text-base font-medium text-neutral-300 mb-3">
          At observe-time
        </h3>
        <HighlightedCodeTabs
          ts={`const client = observe(
  new OpenAI({ apiKey: 'sk-...' }),
  Provider.OpenAI,
  {
    metadata: {
      userId: 'user-123',
      environment: 'production',
    }
  }
);`}
          py={`client = observe(
  OpenAI(api_key="sk-..."),
  Provider.OPENAI,
  {
    "metadata": {
      "user_id": "user-123",
      "environment": "production",
    }
  }
)`}
        />

        <h3 className="text-base font-medium text-neutral-300 mb-3 mt-6">
          Per-call extension
        </h3>
        <p className="text-sm text-neutral-500 mb-4">
          Pass <InlineCode>pulseMetadata</InlineCode> in the request body. It
          merges with the observe-time metadata — per-call values win on
          conflicts.
        </p>
        <HighlightedCodeTabs
          ts={`await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Summarize this' }],
  pulseMetadata: {
    feature: 'summarizer',
    version: '2.1',
  },
});

// Final metadata on trace:
// { userId: 'user-123', environment: 'production', feature: 'summarizer', version: '2.1' }`}
          py={`client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Summarize this"}],
  pulse_metadata={
    "feature": "summarizer",
    "version": "2.1",
  },
)

# Final metadata on trace:
# { "user_id": "user-123", "environment": "production", "feature": "summarizer", "version": "2.1" }`}
        />
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ObserveOptions
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          The third argument to <InlineCode>observe()</InlineCode>:
        </p>
        <div className="space-y-4">
          <div className="border border-neutral-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="font-mono text-sm text-white">sessionId</code>
              <span className="text-xs text-neutral-600 font-mono">string</span>
            </div>
            <p className="text-sm text-neutral-500">
              Default session ID for all calls through this client.
            </p>
          </div>
          <div className="border border-neutral-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="font-mono text-sm text-white">metadata</code>
              <span className="text-xs text-neutral-600 font-mono">
                {"Record<string, unknown>"}
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              Default metadata merged into every trace from this client.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Per-call params
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          These are passed in the request body alongside normal provider params.
          They are stripped before the request is sent to the provider.
        </p>
        <div className="space-y-4">
          <div className="border border-neutral-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="font-mono text-sm text-white">
                pulseSessionId
              </code>
              <span className="text-xs text-neutral-600 font-mono">string</span>
            </div>
            <p className="text-sm text-neutral-500">
              Override session ID for this call only.
            </p>
          </div>
          <div className="border border-neutral-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="font-mono text-sm text-white">
                pulseMetadata
              </code>
              <span className="text-xs text-neutral-600 font-mono">
                {"Record<string, unknown>"}
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              Additional metadata merged with observe-time metadata. Per-call
              values win on key conflicts.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Viewing sessions
        </h2>
        <p className="text-sm text-neutral-500 mb-3">
          In the dashboard, navigate to Sessions to see all sessions grouped by
          ID. Each session shows a timeline of its traces ordered by timestamp.
        </p>
        <p className="text-sm text-neutral-500 mb-3">Via the API:</p>
        <CodeBlock language="bash">GET /v1/sessions/:id</CodeBlock>
        <p className="text-sm text-neutral-500 mt-3">
          Returns all traces for that session. See{" "}
          <Link
            to="/docs/api"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            API reference
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
