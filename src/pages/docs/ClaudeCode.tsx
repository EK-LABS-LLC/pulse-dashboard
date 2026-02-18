import { BashCode, InlineCode } from "../../components/docs";

export default function ClaudeCode() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-[11px] font-medium uppercase tracking-[1.5px] text-neutral-600 mb-2">
          Integrations
        </div>
        <h1
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
        >
          Claude Code
        </h1>
        <p className="text-neutral-500 text-[15px]">
          Capture tool calls, sessions, and agent events from Claude Code automatically.
        </p>
      </div>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Overview
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          The Pulse CLI hooks into Claude Code to capture tool and session events as structured
          spans, then ships them to your Pulse trace service. This gives you full visibility into
          your agentic workflows — every tool call, reasoning step, and session state change.
        </p>
        <div className="bg-neutral-900/50 border border-neutral-800 rounded p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-300 mb-1">Non-blocking hooks</div>
              <p className="text-xs text-neutral-500">
                Hooks are async and non-blocking — Claude Code never waits for Pulse. Zero impact on your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Quick Start
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Requires a running Pulse trace service and Claude Code installed.
        </p>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-neutral-500 mb-2">1. Install the CLI</div>
            <BashCode>cargo install --path .</BashCode>
          </div>

          <div>
            <div className="text-xs text-neutral-500 mb-2">2. Initialize with your trace service</div>
            <BashCode>pulse init</BashCode>
            <p className="text-xs text-neutral-600 mt-2">
              Prompts for your trace service URL, API key, and project ID. Saves to{" "}
              <InlineCode variant="muted">~/.pulse/config.toml</InlineCode>.
            </p>
          </div>

          <div>
            <div className="text-xs text-neutral-500 mb-2">3. Connect hooks to Claude Code</div>
            <BashCode>pulse connect</BashCode>
            <p className="text-xs text-neutral-600 mt-2">
              That's it. Every Claude Code session now sends spans to your trace service.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Hooks Installed
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          <InlineCode variant="muted">pulse connect</InlineCode> installs 10 async hooks
          into <InlineCode variant="muted">~/.claude/settings.json</InlineCode>:
        </p>
        <div className="bg-[#111111] border border-neutral-800 rounded p-4">
          <div className="grid grid-cols-2 gap-2 text-sm font-mono">
            <div className="text-neutral-400">PreToolUse</div>
            <div className="text-neutral-400">PostToolUse</div>
            <div className="text-neutral-400">PostToolUseFailure</div>
            <div className="text-neutral-400">SessionStart</div>
            <div className="text-neutral-400">SessionEnd</div>
            <div className="text-neutral-400">Stop</div>
            <div className="text-neutral-400">SubagentStart</div>
            <div className="text-neutral-400">SubagentStop</div>
            <div className="text-neutral-400">UserPromptSubmit</div>
            <div className="text-neutral-400">Notification</div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Span Schema
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Each span sent to the trace service includes:
        </p>
        <table className="w-full text-sm border border-neutral-800">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="p-3 text-left text-neutral-400 font-medium">Field</th>
              <th className="p-3 text-left text-neutral-400 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["span_id", "UUID v4 identifier"],
              ["session_id", "Claude Code session identifier"],
              ["timestamp", "ISO 8601 timestamp"],
              ["source", "Always 'claude_code'"],
              ["kind", "tool_use, session, agent_run, user_prompt, or notification"],
              ["event_type", "The specific event (e.g. post_tool_use, session_start)"],
              ["status", "success or error"],
              ["tool_name", "Tool name (for tool events)"],
              ["tool_input", "Tool input payload"],
              ["tool_response", "Tool response (for post_tool_use)"],
              ["error", "Error details (for failures)"],
              ["cwd", "Working directory"],
              ["model", "Model name (if provided)"],
              ["agent_name", "Subagent type (for subagent events)"],
              ["metadata", "cli_version, project_id, and event-specific data"],
            ].map(([key, val]) => (
              <tr key={key} className="border-b border-neutral-800">
                <td className="p-3 text-neutral-300 font-mono text-xs">{key}</td>
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
          Commands
        </h2>
        <table className="w-full text-sm border border-neutral-800">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="p-3 text-left text-neutral-400 font-medium">Command</th>
              <th className="p-3 text-left text-neutral-400 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["pulse init", "Configure trace service connection"],
              ["pulse connect", "Install hooks into Claude Code"],
              ["pulse disconnect", "Remove all Pulse hooks"],
              ["pulse status", "Show config, connectivity, and hook status"],
              ["pulse emit <type>", "Send a span (called by hooks)"],
            ].map(([cmd, desc]) => (
              <tr key={cmd} className="border-b border-neutral-800">
                <td className="p-3 text-neutral-300 font-mono text-xs">{cmd}</td>
                <td className="p-3 text-neutral-500">{desc}</td>
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
          CI / Docker Setup
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          For automated environments, use flags to skip prompts:
        </p>
        <BashCode>{`pulse init \\
  --api-url https://pulse.example.com \\
  --api-key sk-your-key \\
  --project-id my-project \\
  --no-validate`}</BashCode>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Debugging
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Set <InlineCode variant="muted">PULSE_DEBUG=1</InlineCode> to log raw payloads:
        </p>
        <BashCode>{`export PULSE_DEBUG=1`}</BashCode>
        <p className="text-xs text-neutral-600 mt-2">
          Writes to <InlineCode variant="muted">~/.pulse/debug.log</InlineCode>. Override
          with <InlineCode variant="muted">PULSE_DEBUG_LOG=/path/to/file</InlineCode>.
        </p>
      </section>

      <section className="mb-10">
        <h2
          className="text-xl font-semibold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Viewing in Dashboard
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Once connected, view your Claude Code sessions in the Pulse dashboard:
        </p>
        <ul className="text-sm text-neutral-500 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-violet-400 mt-0.5">→</span>
            <span>
              <strong className="text-neutral-300">Sessions → Agents tab</strong> — See all your
              Claude Code sessions with agent runs, tool calls, and duration
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-400 mt-0.5">→</span>
            <span>
              <strong className="text-neutral-300">Click a session</strong> — View the waterfall
              timeline showing every tool call, input, and response
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-400 mt-0.5">→</span>
            <span>
              <strong className="text-neutral-300">Click a span</strong> — See full tool input,
              response, errors, and metadata
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
