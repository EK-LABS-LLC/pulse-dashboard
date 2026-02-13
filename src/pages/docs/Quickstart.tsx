import { Link } from "react-router-dom";
import { CodeTabs } from "../../components/landing/CodeTabs";

export default function Quickstart() {
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
          Quickstart
        </h1>
        <p className="text-neutral-500 text-[15px]">
          Instrument your first LLM call in under 5 minutes.
        </p>
      </div>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Install
        </h2>
        <CodeTabs
          ts={
            <div className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm overflow-x-auto">
              <div>
                <span className="text-violet-300">bun</span>{" "}
                <span className="text-green-300">add</span>{" "}
                <span className="text-neutral-300">@pulse/sdk</span>
              </div>
            </div>
          }
          py={
            <div className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm overflow-x-auto">
              <div>
                <span className="text-violet-300">pip</span>{" "}
                <span className="text-green-300">install</span>{" "}
                <span className="text-neutral-300">pulse-sdk</span>
              </div>
            </div>
          }
        />
        <p className="text-sm text-neutral-500 mt-3">
          Works with Bun, Node, or any JavaScript/Python runtime.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Initialize
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Call <code className="font-mono text-[0.9em]">initPulse()</code> once at application
          startup. You need an API key from the Pulse dashboard.
        </p>
        <CodeTabs
          ts={
            <div className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm overflow-x-auto">
              <div>
                <span className="text-violet-300">import</span>{" "}
                <span className="text-neutral-300">initPulse</span>{" "}
                <span className="text-violet-300">from</span>{" "}
                <span className="text-green-300">'@pulse/sdk'</span>;
              </div>
              <br />
              <div>
                <span className="text-neutral-300">initPulse</span>
                <span>(</span>
                <span>{"{"}</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span className="text-neutral-300">apiKey</span>
                <span>: </span>
                <span className="text-green-300">'pulse_sk_...'</span>
              </div>
              <div>
                <span>{"}"}</span>
                <span>)</span>;
              </div>
            </div>
          }
          py={
            <div className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm overflow-x-auto">
              <div>
                <span className="text-violet-300">from</span>{" "}
                <span className="text-neutral-300">pulse_sdk</span>{" "}
                <span className="text-violet-300">import</span>{" "}
                <span className="text-neutral-300">init_pulse</span>
              </div>
              <br />
              <div>
                <span className="text-neutral-300">init_pulse</span>
                <span>(</span>
                <span>{"{"}</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span className="text-green-300">"api_key"</span>
                <span>: </span>
                <span className="text-green-300">"pulse_sk_..."</span>
              </div>
              <div>
                <span>{"}"}</span>
                <span>)</span>
              </div>
            </div>
          }
        />
        <p className="text-sm text-neutral-500 mt-3">
          This starts background trace batching and registers shutdown handlers to flush remaining
          traces on exit.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Wrap your client
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Use <code className="font-mono text-[0.9em]">observe()</code> to wrap your LLM client. The
          returned client behaves identically — all tracing happens as a side effect.
        </p>
        <CodeTabs
          ts={
            <div className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm overflow-x-auto">
              <div>
                <span className="text-violet-300">import</span>{" "}
                <span className="text-neutral-300">{`{ initPulse, observe, Provider }`}</span>{" "}
                <span className="text-violet-300">from</span>{" "}
                <span className="text-green-300">'@pulse/sdk'</span>;
              </div>
              <div>
                <span className="text-violet-300">import</span>{" "}
                <span className="text-blue-300">OpenAI</span>{" "}
                <span className="text-violet-300">from</span>{" "}
                <span className="text-green-300">'openai'</span>;
              </div>
              <br />
              <div>
                <span className="text-neutral-300">initPulse</span>
                <span>(</span>
                <span>{"{"}</span>
                <span> </span>
                <span className="text-neutral-300">apiKey</span>
                <span>: </span>
                <span className="text-green-300">'pulse_sk_...'</span>
                <span> </span>
                <span>{"}"}</span>
                <span>)</span>;
              </div>
              <br />
              <div>
                <span className="text-violet-300">const</span>{" "}
                <span className="text-neutral-300">client</span> <span>=</span>{" "}
                <span className="text-neutral-300">observe</span>
                <span>(</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span className="text-violet-300">new</span>{" "}
                <span className="text-blue-300">OpenAI</span>
                <span>{"({"}</span>
                <span> </span>
                <span className="text-neutral-300">apiKey</span>
                <span>: </span>
                <span className="text-green-300">'sk-...'</span>
                <span> </span>
                <span>{"})"}</span>
                <span>,</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span className="text-blue-300">Provider</span>
                <span>.OpenAI</span>
              </div>
              <div>);</div>
              <br />
              <div>
                <span className="text-neutral-600">
                  // Use as normal. Traces are captured automatically.
                </span>
              </div>
              <div>
                <span className="text-violet-300">const</span>{" "}
                <span className="text-neutral-300">res</span> <span>=</span>{" "}
                <span className="text-violet-300">await</span>{" "}
                <span className="text-neutral-300">client</span>
                <span>.chat.completions.create(</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span>model:</span> <span className="text-green-300">'gpt-4o'</span>
                <span>,</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span>messages:</span> <span>{"[{ "}</span>
                <span>role:</span> <span className="text-green-300">'user'</span>
                <span>,</span> <span>content:</span> <span className="text-green-300">'Hello'</span>{" "}
                <span>{"}]"}</span>
                <span>,</span>
              </div>
              <div>);</div>
            </div>
          }
          py={
            <div className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm overflow-x-auto">
              <div>
                <span className="text-violet-300">from</span>{" "}
                <span className="text-neutral-300">pulse_sdk</span>{" "}
                <span className="text-violet-300">import</span>{" "}
                <span className="text-neutral-300">init_pulse</span>
                <span>, </span>
                <span className="text-neutral-300">observe</span>
                <span>, </span>
                <span className="text-neutral-300">Provider</span>
              </div>
              <div>
                <span className="text-violet-300">from</span>{" "}
                <span className="text-neutral-300">openai</span>{" "}
                <span className="text-violet-300">import</span>{" "}
                <span className="text-blue-300">OpenAI</span>
              </div>
              <br />
              <div>
                <span className="text-neutral-300">init_pulse</span>
                <span>(</span>
                <span>{"{"}</span>
                <span> </span>
                <span className="text-green-300">"api_key"</span>
                <span>: </span>
                <span className="text-green-300">"pulse_sk_..."</span>
                <span> </span>
                <span>{"}"}</span>
                <span>)</span>
              </div>
              <br />
              <div>
                <span className="text-neutral-300">client</span> <span>=</span>{" "}
                <span className="text-neutral-300">observe</span>
                <span>(</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span className="text-blue-300">OpenAI</span>
                <span>(api_key=</span>
                <span className="text-green-300">"sk-..."</span>
                <span>),</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span className="text-blue-300">Provider</span>
                <span>.OPENAI</span>
              </div>
              <div>)</div>
              <br />
              <div>
                <span className="text-neutral-600">
                  # Use as normal. Traces are captured automatically.
                </span>
              </div>
              <div>
                <span className="text-neutral-300">res</span> <span>=</span>{" "}
                <span className="text-neutral-300">client</span>
                <span>.chat.completions.create(</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span>model=</span>
                <span className="text-green-300">"gpt-4o"</span>
                <span>,</span>
              </div>
              <div>
                <span>{"  "}</span>
                <span>messages=[</span>
                <span>{"{ "}</span>
                <span className="text-green-300">"role"</span>
                <span>: </span>
                <span className="text-green-300">"user"</span>
                <span>, </span>
                <span className="text-green-300">"content"</span>
                <span>: </span>
                <span className="text-green-300">"Hello"</span>
                <span>{" }"},</span>
                <span>]</span>
              </div>
              <div>)</div>
            </div>
          }
        />
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          What gets captured
        </h2>
        <p className="text-sm text-neutral-500 mb-4">Each traced call records:</p>
        <table className="w-full text-sm border border-neutral-800">
          <tbody>
            {[
              ["Request & response bodies", "Full prompt and completion"],
              ["Token counts", "Input and output tokens"],
              ["Latency", "End-to-end request duration in ms"],
              ["Cost", "Calculated from model pricing in cents"],
              ["Model", "Requested and actual model used"],
              ["Status", "success or error"],
              ["Provider", "openai, anthropic, or openrouter"],
            ].map(([key, val]) => (
              <tr key={key} className="border-b border-neutral-800">
                <td className="p-3 text-neutral-300">{key}</td>
                <td className="p-3 text-neutral-500">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Supported providers
        </h2>
        <table className="w-full text-sm border border-neutral-800">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="p-3 text-left text-neutral-400 font-medium">Provider</th>
              <th className="p-3 text-left text-neutral-400 font-medium">Client</th>
              <th className="p-3 text-left text-neutral-400 font-medium">Enum</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-800">
              <td className="p-3 text-neutral-300">OpenAI</td>
              <td className="p-3">
                <code className="font-mono text-sm text-neutral-400">openai</code>
              </td>
              <td className="p-3">
                <code className="font-mono text-sm text-neutral-400">Provider.OpenAI</code>
              </td>
            </tr>
            <tr className="border-b border-neutral-800">
              <td className="p-3 text-neutral-300">Anthropic</td>
              <td className="p-3">
                <code className="font-mono text-sm text-neutral-400">@anthropic-ai/sdk</code>
              </td>
              <td className="p-3">
                <code className="font-mono text-sm text-neutral-400">Provider.Anthropic</code>
              </td>
            </tr>
            <tr className="border-b border-neutral-800">
              <td className="p-3 text-neutral-300">OpenRouter</td>
              <td className="p-3">
                <code className="font-mono text-sm text-neutral-400">openai</code>
              </td>
              <td className="p-3">
                <code className="font-mono text-sm text-neutral-400">Provider.OpenRouter</code>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-neutral-500 mt-3">
          See{" "}
          <Link
            to="/docs/providers"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            Providers
          </Link>{" "}
          for detailed usage per provider.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Next steps
        </h2>
        <ul className="text-sm text-neutral-500 space-y-2">
          <li>
            <Link to="/docs/config" className="text-neutral-300 hover:text-white transition-colors">
              Configuration
            </Link>{" "}
            — tune batching, flush intervals, and more
          </li>
          <li>
            <Link
              to="/docs/sessions"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Sessions & Metadata
            </Link>{" "}
            — group traces and attach custom data
          </li>
          <li>
            <Link
              to="/docs/providers"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Providers
            </Link>{" "}
            — Anthropic, OpenRouter, and streaming
          </li>
        </ul>
      </section>
    </div>
  );
}
