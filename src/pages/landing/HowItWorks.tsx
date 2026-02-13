import { CodeTabs } from "../../components/landing/CodeTabs";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-b border-neutral-800">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="max-w-[560px] mb-14">
          <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-4">
            How it works
          </div>
          <h2
            className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
          >
            Instrument in minutes, not days
          </h2>
          <p className="text-neutral-500 text-[15px] leading-relaxed">
            Three steps to full observability across your entire LLM stack.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Step 1 */}
          <div className="p-8 border border-neutral-800 -mr-px">
            <div
              className="text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Step 01
            </div>
            <h3
              className="text-base font-semibold text-white mb-2.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            >
              Install the SDK
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4">
              Add the SDK to your project. Works with any TypeScript/JavaScript or Python runtime.
            </p>
            <div className="border border-neutral-800 bg-[#080808]">
              <CodeTabs
                ts={
                  <div className="p-4 font-mono text-xs text-neutral-500 leading-relaxed">
                    <span className="text-neutral-300">$</span> bun add{" "}
                    <span className="text-green-300">@pulse/sdk</span>
                  </div>
                }
                py={
                  <div className="p-4 font-mono text-xs text-neutral-500 leading-relaxed">
                    <span className="text-neutral-300">$</span> pip install{" "}
                    <span className="text-green-300">pulse-sdk</span>
                  </div>
                }
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-8 border border-neutral-800 -mr-px">
            <div
              className="text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Step 02
            </div>
            <h3
              className="text-base font-semibold text-white mb-2.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            >
              Wrap your LLM client
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4">
              Call <code className="font-mono text-[0.9em]">observe()</code> on your existing
              client. No other code changes needed.
            </p>
            <div className="border border-neutral-800 bg-[#080808]">
              <CodeTabs
                ts={
                  <div className="p-4 font-mono text-xs text-neutral-500 leading-relaxed">
                    <span className="text-violet-300">const</span> client ={" "}
                    <span className="text-neutral-300">observe</span>(<br />
                    &nbsp;&nbsp;<span className="text-violet-300">new</span> OpenAI({"{...}"}),
                    <br />
                    &nbsp;&nbsp;Provider.OpenAI
                    <br />
                    );
                  </div>
                }
                py={
                  <div className="p-4 font-mono text-xs text-neutral-500 leading-relaxed">
                    client = <span className="text-neutral-300">observe</span>(<br />
                    &nbsp;&nbsp;OpenAI(...),
                    <br />
                    &nbsp;&nbsp;Provider.OPENAI
                    <br />)
                  </div>
                }
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 border border-neutral-800">
            <div
              className="text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Step 03
            </div>
            <h3
              className="text-base font-semibold text-white mb-2.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            >
              Open the dashboard
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4">
              Traces flow in automatically. Search, filter, and analyze from the Pulse dashboard.
            </p>
            <div className="border border-neutral-800 bg-[#080808] p-4 font-mono text-xs text-neutral-500 leading-relaxed">
              142 traces captured
              <br />
              $0.47 total cost
              <br />
              avg latency 1.2s
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
