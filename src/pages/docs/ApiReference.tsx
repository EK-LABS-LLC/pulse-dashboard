export default function ApiReference() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-2">Reference</div>
        <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>REST API</h1>
        <p className="text-neutral-500 text-[15px]">All endpoints on the Pulse trace service.</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Authentication</h2>
        <p className="text-sm text-neutral-500 mb-4">All endpoints require a Bearer token in the <code className="font-mono text-[0.9em]">Authorization</code> header.</p>
        <pre className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm text-neutral-400 overflow-x-auto"><code>Authorization: Bearer pulse_sk_...</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>POST /v1/traces/async</h2>
        <p className="text-sm text-neutral-500 mb-4">Ingest a batch of traces asynchronously. This is what the SDK calls automatically.</p>
        <table className="w-full text-sm border border-neutral-800 mb-4">
          <tbody>
            <tr className="border-b border-neutral-800"><td className="p-3 text-neutral-300">Method</td><td className="p-3"><code className="font-mono text-neutral-400">POST</code></td></tr>
            <tr className="border-b border-neutral-800"><td className="p-3 text-neutral-300">Body</td><td className="p-3 text-neutral-500">JSON array of trace objects</td></tr>
            <tr className="border-b border-neutral-800"><td className="p-3 text-neutral-300">Response</td><td className="p-3"><code className="font-mono text-neutral-400">202 Accepted</code></td></tr>
          </tbody>
        </table>
        <pre className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm text-neutral-400 overflow-x-auto"><code>{`curl -X POST https://your-pulse/v1/traces/async \\
  -H "Authorization: Bearer pulse_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '[{
    "trace_id": "uuid",
    "timestamp": "2025-01-01T00:00:00Z",
    "provider": "openai",
    "model_requested": "gpt-4o",
    "request_body": { ... },
    "response_body": { ... },
    "input_tokens": 50,
    "output_tokens": 100,
    "latency_ms": 1200,
    "status": "success"
  }]'`}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GET /v1/traces</h2>
        <p className="text-sm text-neutral-500 mb-4">Query traces for the authenticated project.</p>
        <h3 className="text-base font-medium text-neutral-300 mb-3">Query parameters</h3>
        <div className="space-y-4 mb-4">
          {[
            { name: 'session_id', type: 'string', desc: 'Filter by session ID.' },
            { name: 'provider', type: 'string', desc: 'Filter by provider: openai, anthropic, openrouter.' },
            { name: 'model', type: 'string', desc: 'Filter by model name.' },
            { name: 'status', type: 'string', desc: 'Filter by status: success or error.' },
            { name: 'date_from', type: 'string', desc: 'Start date. Accepts ISO 8601, epoch timestamp, or YYYY-MM-DD.' },
            { name: 'date_to', type: 'string', desc: 'End date. Same formats as date_from.' },
            { name: 'limit', type: 'number', desc: 'Max results to return.' },
            { name: 'offset', type: 'number', desc: 'Results offset for pagination.' },
          ].map((p) => (
            <div key={p.name} className="border border-neutral-800 p-4">
              <div className="flex items-center gap-2 mb-1">
                <code className="font-mono text-sm text-white">{p.name}</code>
                <span className="text-xs text-neutral-600 font-mono">{p.type}</span>
              </div>
              <p className="text-sm text-neutral-500">{p.desc}</p>
            </div>
          ))}
        </div>
        <pre className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm text-neutral-400 overflow-x-auto"><code>GET /v1/traces?provider=openai&status=error&limit=20</code></pre>
        <p className="text-sm text-neutral-500 mt-3">Returns <code className="font-mono text-[0.9em]">{'{ traces: [...], total: number }'}</code>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GET /v1/traces/:id</h2>
        <p className="text-sm text-neutral-500 mb-4">Get a single trace by ID.</p>
        <pre className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm text-neutral-400 overflow-x-auto"><code>GET /v1/traces/550e8400-e29b-41d4-a716-446655440000</code></pre>
        <p className="text-sm text-neutral-500 mt-3">Returns the trace object or <code className="font-mono text-[0.9em]">404</code>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GET /v1/sessions/:id</h2>
        <p className="text-sm text-neutral-500 mb-4">Get all traces for a session, ordered by timestamp ascending.</p>
        <pre className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm text-neutral-400 overflow-x-auto"><code>GET /v1/sessions/conv-abc-123</code></pre>
        <p className="text-sm text-neutral-500 mt-3">Returns <code className="font-mono text-[0.9em]">{'{ traces: [...], metadata: {...} }'}</code> or <code className="font-mono text-[0.9em]">404</code>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GET /v1/analytics</h2>
        <p className="text-sm text-neutral-500 mb-4">Aggregated metrics for the authenticated project.</p>
        <div className="space-y-4">
          {[
            { name: 'date_from', type: 'string', required: true, desc: 'Start of date range.' },
            { name: 'date_to', type: 'string', required: true, desc: 'End of date range.' },
            { name: 'group_by', type: 'string', required: false, desc: 'Grouping dimension (optional).' },
          ].map((p) => (
            <div key={p.name} className="border border-neutral-800 p-4">
              <div className="flex items-center gap-2 mb-1">
                <code className="font-mono text-sm text-white">{p.name}</code>
                <span className="text-xs text-neutral-600 font-mono">{p.type}</span>
                {p.required && <span className="text-xs text-amber-500/80 font-medium">required</span>}
              </div>
              <p className="text-sm text-neutral-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin endpoints</h2>
        <p className="text-sm text-neutral-500 mb-4">These require admin authentication.</p>

        <h3 className="text-base font-medium text-neutral-300 mb-3">POST /admin/projects</h3>
        <p className="text-sm text-neutral-500 mb-3">Create a new project.</p>
        <pre className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm text-neutral-400 overflow-x-auto mb-3"><code>{`curl -X POST https://your-pulse/admin/projects \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "my-app" }'`}</code></pre>
        <p className="text-sm text-neutral-500 mb-6">Returns <code className="font-mono text-[0.9em]">201</code> with project info and a new API key.</p>

        <h3 className="text-base font-medium text-neutral-300 mb-3">GET /admin/api-keys</h3>
        <p className="text-sm text-neutral-500 mb-6">List all API keys for the authenticated project.</p>

        <h3 className="text-base font-medium text-neutral-300 mb-3">DELETE /admin/api-keys/:id</h3>
        <p className="text-sm text-neutral-500">Delete an API key by ID. Returns <code className="font-mono text-[0.9em]">200</code> or <code className="font-mono text-[0.9em]">404</code>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Trace object</h2>
        <pre className="bg-[#111111] border border-neutral-800 p-4 font-mono text-sm text-neutral-400 overflow-x-auto"><code>{`{
  "trace_id": "uuid",
  "timestamp": "ISO 8601",
  "provider": "openai | anthropic | openrouter",
  "model_requested": "gpt-4o",
  "model_used": "gpt-4o-2024-11-20",
  "provider_request_id": "...",
  "request_body": { ... },
  "response_body": { ... },
  "input_tokens": 50,
  "output_tokens": 100,
  "output_text": "Hello! How can I...",
  "finish_reason": "stop",
  "status": "success",
  "error": null,
  "cost_cents": 0.18,
  "latency_ms": 1234,
  "session_id": "conv-abc-123",
  "metadata": { "userId": "user-123" }
}`}</code></pre>
      </section>
    </div>
  );
}
