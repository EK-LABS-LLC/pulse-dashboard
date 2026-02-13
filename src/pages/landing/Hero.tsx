import { Link } from 'react-router-dom';
import { CodeTabs } from '../../components/landing/CodeTabs';

export function Hero() {
  return (
    <section className="pt-40 pb-24 border-b border-neutral-800">
      <div className="max-w-[1100px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1
            className="text-[clamp(2.8rem,4.5vw,4rem)] font-bold leading-[1.05] text-white mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
          >
            Observability for every LLM call your app makes
          </h1>
          <p className="text-base text-neutral-500 max-w-[440px] mb-8 leading-relaxed">
            Trace prompts, completions, latency, tokens, and cost across OpenAI, Anthropic, and OpenRouter with a single SDK for TypeScript and Python.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium bg-white border border-white text-[#080808] hover:bg-neutral-200 hover:border-neutral-200 transition-colors"
            >
              Start free
            </a>
            <Link
              to="/docs"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300 transition-colors"
            >
              Read the docs
            </Link>
          </div>
        </div>
        <div className="bg-[#111111] border border-neutral-800 overflow-hidden">
          <CodeTabs
            ts={
              <div className="p-6 font-mono text-[13px] leading-[1.9] text-neutral-500 overflow-x-auto">
                <div><span className="text-violet-300">import</span> {'{ '}<span className="text-neutral-300">initPulse</span>{', '}<span className="text-neutral-300">observe</span>{', '}<span className="text-blue-300">Provider</span>{' }'} <span className="text-violet-300">from</span> <span className="text-green-300">'@pulse/sdk'</span>;</div>
                <div><span className="text-violet-300">import</span> <span className="text-blue-300">OpenAI</span> <span className="text-violet-300">from</span> <span className="text-green-300">'openai'</span>;</div>
                <br />
                <div><span className="text-neutral-300">initPulse</span>({'{ '}apiKey: <span className="text-green-300">'pulse_sk_...'</span>{' }'});</div>
                <br />
                <div><span className="text-violet-300">const</span> <span className="text-neutral-300">client</span> = <span className="text-neutral-300">observe</span>(</div>
                <div>&nbsp;&nbsp;<span className="text-violet-300">new</span> <span className="text-blue-300">OpenAI</span>({'{ '}apiKey: <span className="text-green-300">'...'</span>{' }'}),</div>
                <div>&nbsp;&nbsp;<span className="text-blue-300">Provider</span>.OpenAI</div>
                <div>);</div>
                <br />
                <div><span className="text-neutral-600">// Every call is now traced automatically.</span></div>
              </div>
            }
            py={
              <div className="p-6 font-mono text-[13px] leading-[1.9] text-neutral-500 overflow-x-auto">
                <div><span className="text-violet-300">from</span> <span className="text-neutral-300">pulse_sdk</span> <span className="text-violet-300">import</span> <span className="text-neutral-300">init_pulse</span>, <span className="text-neutral-300">observe</span>, <span className="text-blue-300">Provider</span></div>
                <div><span className="text-violet-300">from</span> <span className="text-neutral-300">openai</span> <span className="text-violet-300">import</span> <span className="text-blue-300">OpenAI</span></div>
                <br />
                <div><span className="text-neutral-300">init_pulse</span>({'{ '}<span className="text-green-300">"api_key"</span>: <span className="text-green-300">"pulse_sk_..."</span>{' }'})</div>
                <br />
                <div><span className="text-neutral-300">client</span> = <span className="text-neutral-300">observe</span>(</div>
                <div>&nbsp;&nbsp;<span className="text-blue-300">OpenAI</span>(api_key=<span className="text-green-300">"..."</span>),</div>
                <div>&nbsp;&nbsp;<span className="text-blue-300">Provider</span>.OPENAI</div>
                <div>)</div>
                <br />
                <div><span className="text-neutral-600"># Every call is now traced automatically.</span></div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
