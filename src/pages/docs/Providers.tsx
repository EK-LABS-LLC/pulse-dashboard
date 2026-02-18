import { HighlightedCodeTabs, InlineCode } from "../../components/docs";

export default function Providers() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-2">
          SDK
        </div>
        <h1
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
        >
          Providers
        </h1>
        <p className="text-neutral-500 text-[15px]">
          How to use <InlineCode>observe()</InlineCode> with each supported
          provider.
        </p>
      </div>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          observe(client, provider, options?)
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Wraps an LLM client and returns a traced version. The returned client has same type and
          API as original.
        </p>
        <HighlightedCodeTabs
          ts={`const traced = observe(client, Provider.OpenAI);
const traced = observe(client, Provider.Anthropic);
const traced = observe(client, Provider.OpenRouter);`}
          py={`traced = observe(client, Provider.OPENAI)
traced = observe(client, Provider.ANTHROPIC)
traced = observe(client, Provider.OPENROUTER)`}
        />
        <p className="text-sm text-neutral-500 mt-3">What gets patched:</p>
        <ul className="text-sm text-neutral-500 space-y-1.5 list-disc pl-5 mt-2">
          <li>
            <strong className="text-neutral-300">OpenAI / OpenRouter</strong> —{" "}
            <InlineCode>client.chat.completions.create</InlineCode>
          </li>
          <li>
            <strong className="text-neutral-300">Anthropic</strong> —{" "}
            <InlineCode>client.messages.create</InlineCode>
          </li>
        </ul>
        <p className="text-sm text-neutral-500 mt-3">
          All other methods on client remain untouched.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          OpenAI
        </h2>
        <HighlightedCodeTabs
          ts={`import OpenAI from 'openai';
import { observe, Provider } from '@pulse/sdk';

const client = observe(
  new OpenAI({ apiKey: 'sk-...' }),
  Provider.OpenAI
);

// Non-streaming
const res = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello' }],
});

// Streaming
const stream = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello' }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? '');
}`}
          py={`from openai import OpenAI
from pulse_sdk import observe, Provider

client = observe(
  OpenAI(api_key="sk-..."),
  Provider.OPENAI
)

# Non-streaming
res = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Hello"}],
)

# Streaming
stream = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Hello"}],
  stream=True,
)

for chunk in stream:
  print(chunk.choices[0].delta.content or "", end="")`}
        />
        <p className="text-sm text-neutral-500 mt-3">
          Both streaming and non-streaming calls are traced. For streams, trace is recorded after
          stream completes.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Anthropic
        </h2>
        <HighlightedCodeTabs
          ts={`import Anthropic from '@anthropic-ai/sdk';
import { observe, Provider } from '@pulse/sdk';

const client = observe(
  new Anthropic({ apiKey: 'sk-ant-...' }),
  Provider.Anthropic
);

// Non-streaming
const res = await client.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello' }],
});

// Streaming
const stream = await client.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello' }],
  stream: true,
});

for await (const event of stream) {
  if (event.type === 'content_block_delta') {
    process.stdout.write(event.delta.text);
  }
}`}
          py={`from anthropic import Anthropic
from pulse_sdk import observe, Provider

client = observe(
  Anthropic(api_key="sk-ant-..."),
  Provider.ANTHROPIC
)

# Non-streaming
res = client.messages.create(
  model="claude-3-5-sonnet-20241022",
  max_tokens=1024,
  messages=[{"role": "user", "content": "Hello"}],
)

# Streaming
with client.messages.stream(
  model="claude-3-5-sonnet-20241022",
  max_tokens=1024,
  messages=[{"role": "user", "content": "Hello"}],
) as stream:
  for text in stream.text_stream:
    print(text, end="")`}
        />
        <div className="mt-4 border border-neutral-800 bg-[#111111] p-4 text-sm text-neutral-500">
          <strong className="text-neutral-300">Stop reason mapping.</strong> Anthropic stop reasons
          are normalized: <InlineCode variant="muted">end_turn</InlineCode> &rarr;{" "}
          <InlineCode variant="muted">stop</InlineCode>,{" "}
          <InlineCode variant="muted">max_tokens</InlineCode> &rarr;{" "}
          <InlineCode variant="muted">length</InlineCode>,{" "}
          <InlineCode variant="muted">stop_sequence</InlineCode> &rarr;{" "}
          <InlineCode variant="muted">stop</InlineCode>,{" "}
          <InlineCode variant="muted">tool_use</InlineCode> &rarr;{" "}
          <InlineCode variant="muted">tool_calls</InlineCode>.
        </div>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          OpenRouter
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          OpenRouter uses OpenAI client library. Pass{" "}
          <InlineCode>Provider.OpenRouter</InlineCode> so Pulse records
          correct provider and extracts OpenRouter-specific cost data.
        </p>
        <HighlightedCodeTabs
          ts={`import OpenAI from 'openai';
import { observe, Provider } from '@pulse/sdk';

const client = observe(
  new OpenAI({
    apiKey: 'sk-or-...',
    baseURL: 'https://openrouter.ai/api/v1',
  }),
  Provider.OpenRouter
);

const res = await client.chat.completions.create({
  model: 'anthropic/claude-3.5-sonnet',
  messages: [{ role: 'user', content: 'Hello' }],
});`}
          py={`from openai import OpenAI
from pulse_sdk import observe, Provider

client = observe(
  OpenAI(
    api_key="sk-or-...",
    base_url="https://openrouter.ai/api/v1",
  ),
  Provider.OPENROUTER
)

res = client.chat.completions.create(
  model="anthropic/claude-3.5-sonnet",
  messages=[{"role": "user", "content": "Hello"}],
)`}
        />
        <p className="text-sm text-neutral-500 mt-3">
          When OpenRouter includes a <InlineCode>cost</InlineCode> field in
          response, Pulse uses that directly instead of calculating from token counts.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Pricing
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          The SDK calculates cost automatically for known models. Pricing is built in for:
        </p>
        <table className="w-full text-sm border border-neutral-800">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="p-3 text-left text-neutral-400 font-medium">Model</th>
              <th className="p-3 text-left text-neutral-400 font-medium">Input</th>
              <th className="p-3 text-left text-neutral-400 font-medium">Output</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["gpt-4o", "$2.50 / 1M", "$10.00 / 1M"],
              ["gpt-4o-mini", "$0.15 / 1M", "$0.60 / 1M"],
              ["gpt-4-turbo", "$10.00 / 1M", "$30.00 / 1M"],
              ["gpt-3.5-turbo", "$0.50 / 1M", "$1.50 / 1M"],
              ["claude-3-5-sonnet-20241022", "$3.00 / 1M", "$15.00 / 1M"],
              ["claude-3-5-haiku-20241022", "$0.80 / 1M", "$4.00 / 1M"],
              ["claude-3-opus-20240229", "$15.00 / 1M", "$75.00 / 1M"],
            ].map(([model, input, output]) => (
              <tr key={model} className="border-b border-neutral-800">
                <td className="p-3">
                  <InlineCode variant="muted">{model}</InlineCode>
                </td>
                <td className="p-3 text-neutral-500">{input}</td>
                <td className="p-3 text-neutral-500">{output}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-neutral-500 mt-3">
          Model aliases (e.g. <InlineCode>gpt-4o-2024-11-20</InlineCode>) are
          resolved to their base model for pricing. Unknown models report{" "}
          <InlineCode>null</InlineCode> cost.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Error handling
        </h2>
        <p className="text-sm text-neutral-500 mb-3">
          If LLM call throws, SDK captures an error trace (with{" "}
          <InlineCode>status: "error"</InlineCode> and error details) and
          then re-throws original error. Your application error handling is unaffected.
        </p>
        <p className="text-sm text-neutral-500">
          If trace sending fails (network error, server down), SDK logs a warning and continues.
          Tracing never breaks your application.
        </p>
      </section>
    </div>
  );
}
