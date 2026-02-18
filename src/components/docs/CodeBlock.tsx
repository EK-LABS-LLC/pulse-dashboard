import { type ReactNode, useState } from "react";

interface CodeBlockProps {
  children: string;
  language?: "typescript" | "python" | "bash" | "json" | "toml";
  showLineNumbers?: boolean;
}

// Syntax highlighting colors
const colors = {
  keyword: "text-violet-400",
  string: "text-emerald-400",
  stringAlt: "text-green-400",
  number: "text-amber-400",
  comment: "text-neutral-600",
  function: "text-blue-400",
  variable: "text-neutral-300",
  operator: "text-neutral-400",
  punctuation: "text-neutral-500",
  property: "text-cyan-400",
  type: "text-yellow-400",
  builtin: "text-rose-400",
  command: "text-sky-400",
  flag: "text-orange-400",
};

// TypeScript/JavaScript highlighter
function highlightTypeScript(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, i) => {
    const tokens: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // Comments
      if (remaining.startsWith("//")) {
        tokens.push(
          <span key={key++} className={colors.comment}>
            {remaining}
          </span>,
        );
        break;
      }

      // Strings (double quotes)
      const stringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (stringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {stringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Strings (single quotes)
      const singleStringMatch = remaining.match(/^'([^'\\]|\\.)*'/);
      if (singleStringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {singleStringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(singleStringMatch[0].length);
        continue;
      }

      // Template literals
      if (remaining.startsWith("`")) {
        let end = 1;
        while (end < remaining.length && remaining[end] !== "`") {
          if (remaining[end] === "\\") end++;
          end++;
        }
        tokens.push(
          <span key={key++} className={colors.string}>
            {remaining.slice(0, end + 1)}
          </span>,
        );
        remaining = remaining.slice(end + 1);
        continue;
      }

      // Keywords
      const keywords = [
        "import",
        "export",
        "from",
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "class",
        "interface",
        "type",
        "enum",
        "new",
        "this",
        "super",
        "extends",
        "implements",
        "async",
        "await",
        "try",
        "catch",
        "throw",
        "typeof",
        "instanceof",
        "in",
        "of",
        "true",
        "false",
        "null",
        "undefined",
        "void",
        "never",
        "any",
        "string",
        "number",
        "boolean",
        "as",
        "is",
        "keyof",
        "readonly",
        "public",
        "private",
        "protected",
        "static",
        "get",
        "set",
        "default",
        "switch",
        "case",
        "break",
        "continue",
      ];
      const keywordMatch = remaining.match(
        new RegExp(`^(${keywords.join("|")})\\b`),
      );
      if (keywordMatch) {
        tokens.push(
          <span key={key++} className={colors.keyword}>
            {keywordMatch[0]}
          </span>,
        );
        remaining = remaining.slice(keywordMatch[0].length);
        continue;
      }

      // Built-in objects/values
      const builtins = [
        "console",
        "Promise",
        "Array",
        "Object",
        "String",
        "Number",
        "Boolean",
        "JSON",
        "Math",
        "Date",
        "Error",
        "Map",
        "Set",
        "WeakMap",
        "WeakSet",
      ];
      const builtinMatch = remaining.match(
        new RegExp(`^(${builtins.join("|")})\\b`),
      );
      if (builtinMatch) {
        tokens.push(
          <span key={key++} className={colors.builtin}>
            {builtinMatch[0]}
          </span>,
        );
        remaining = remaining.slice(builtinMatch[0].length);
        continue;
      }

      // Function calls
      const funcMatch = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
      if (funcMatch) {
        tokens.push(
          <span key={key++} className={colors.function}>
            {funcMatch[1]}
          </span>,
        );
        remaining = remaining.slice(funcMatch[1].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^-?\d+\.?\d*/);
      if (numMatch && !remaining.match(/^-?\d+\.?\d*[a-zA-Z_$]/)) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      // Property access
      const propMatch = remaining.match(/^\.([a-zA-Z_$][a-zA-Z0-9_$]*)/);
      if (propMatch) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            .
          </span>,
        );
        tokens.push(
          <span key={key++} className={colors.property}>
            {propMatch[1]}
          </span>,
        );
        remaining = remaining.slice(propMatch[0].length);
        continue;
      }

      // Variables (camelCase or snake_case words)
      const varMatch = remaining.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
      if (varMatch) {
        tokens.push(
          <span key={key++} className={colors.variable}>
            {varMatch[0]}
          </span>,
        );
        remaining = remaining.slice(varMatch[0].length);
        continue;
      }

      // Operators
      const opMatch = remaining.match(
        /^(=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||<<|>>|>>>|\?\?|\?\.|\.\.\.|[+\-*/%&|^~<>!=?])/,
      );
      if (opMatch) {
        tokens.push(
          <span key={key++} className={colors.operator}>
            {opMatch[0]}
          </span>,
        );
        remaining = remaining.slice(opMatch[0].length);
        continue;
      }

      // Punctuation
      const punctMatch = remaining.match(/^[{}()\[\];:,.\s]/);
      if (punctMatch) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            {punctMatch[0]}
          </span>,
        );
        remaining = remaining.slice(1);
        continue;
      }

      // Fallback - take one character
      tokens.push(
        <span key={key++} className={colors.variable}>
          {remaining[0]}
        </span>,
      );
      remaining = remaining.slice(1);
    }

    return <div key={i}>{tokens}</div>;
  });
}

// Python highlighter
function highlightPython(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, i) => {
    const tokens: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // Comments
      if (remaining.startsWith("#")) {
        tokens.push(
          <span key={key++} className={colors.comment}>
            {remaining}
          </span>,
        );
        break;
      }

      // Strings (double quotes)
      const stringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (stringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {stringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Strings (single quotes)
      const singleStringMatch = remaining.match(/^'([^'\\]|\\.)*'/);
      if (singleStringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {singleStringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(singleStringMatch[0].length);
        continue;
      }

      // Keywords
      const keywords = [
        "import",
        "from",
        "def",
        "class",
        "return",
        "if",
        "elif",
        "else",
        "for",
        "while",
        "in",
        "not",
        "and",
        "or",
        "is",
        "as",
        "with",
        "try",
        "except",
        "finally",
        "raise",
        "assert",
        "pass",
        "break",
        "continue",
        "True",
        "False",
        "None",
        "lambda",
        "yield",
        "global",
        "nonlocal",
        "async",
        "await",
        "match",
        "case",
      ];
      const keywordMatch = remaining.match(
        new RegExp(`^(${keywords.join("|")})\\b`),
      );
      if (keywordMatch) {
        tokens.push(
          <span key={key++} className={colors.keyword}>
            {keywordMatch[0]}
          </span>,
        );
        remaining = remaining.slice(keywordMatch[0].length);
        continue;
      }

      // Built-ins
      const builtins = [
        "print",
        "len",
        "range",
        "str",
        "int",
        "float",
        "bool",
        "list",
        "dict",
        "set",
        "tuple",
        "type",
        "isinstance",
        "hasattr",
        "getattr",
        "setattr",
        "open",
        "self",
        "cls",
      ];
      const builtinMatch = remaining.match(
        new RegExp(`^(${builtins.join("|")})\\b`),
      );
      if (builtinMatch) {
        tokens.push(
          <span key={key++} className={colors.builtin}>
            {builtinMatch[0]}
          </span>,
        );
        remaining = remaining.slice(builtinMatch[0].length);
        continue;
      }

      // Function calls
      const funcMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
      if (funcMatch) {
        tokens.push(
          <span key={key++} className={colors.function}>
            {funcMatch[1]}
          </span>,
        );
        remaining = remaining.slice(funcMatch[1].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^-?\d+\.?\d*/);
      if (numMatch && !remaining.match(/^-?\d+\.?\d*[a-zA-Z_]/)) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      // Decorators
      if (remaining.startsWith("@")) {
        const decMatch = remaining.match(/^@[a-zA-Z_][a-zA-Z0-9_]*/);
        if (decMatch) {
          tokens.push(
            <span key={key++} className={colors.function}>
              {decMatch[0]}
            </span>,
          );
          remaining = remaining.slice(decMatch[0].length);
          continue;
        }
      }

      // Variables
      const varMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (varMatch) {
        tokens.push(
          <span key={key++} className={colors.variable}>
            {varMatch[0]}
          </span>,
        );
        remaining = remaining.slice(varMatch[0].length);
        continue;
      }

      // Operators
      const opMatch = remaining.match(
        /^(==|!=|<=|>=|:=|->|\*\*|\/\/|and|or|not|in|is|[+\-*/%&|^~<>=])/,
      );
      if (opMatch) {
        tokens.push(
          <span key={key++} className={colors.operator}>
            {opMatch[0]}
          </span>,
        );
        remaining = remaining.slice(opMatch[0].length);
        continue;
      }

      // Punctuation
      const punctMatch = remaining.match(/^[{}()\[\];:,.=\\\s]/);
      if (punctMatch) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            {punctMatch[0]}
          </span>,
        );
        remaining = remaining.slice(1);
        continue;
      }

      // Fallback
      tokens.push(
        <span key={key++} className={colors.variable}>
          {remaining[0]}
        </span>,
      );
      remaining = remaining.slice(1);
    }

    return <div key={i}>{tokens}</div>;
  });
}

// Bash highlighter
function highlightBash(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, i) => {
    const tokens: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // Comments
      if (remaining.startsWith("#")) {
        tokens.push(
          <span key={key++} className={colors.comment}>
            {remaining}
          </span>,
        );
        break;
      }

      // Strings (double quotes)
      const stringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (stringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {stringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Strings (single quotes)
      const singleStringMatch = remaining.match(/^'([^'\\]|\\.)*'/);
      if (singleStringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {singleStringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(singleStringMatch[0].length);
        continue;
      }

      // Flags
      const flagMatch = remaining.match(/^--?[a-zA-Z0-9_-]+/);
      if (flagMatch) {
        tokens.push(
          <span key={key++} className={colors.flag}>
            {flagMatch[0]}
          </span>,
        );
        remaining = remaining.slice(flagMatch[0].length);
        continue;
      }

      // Commands
      const commands = [
        "pulse",
        "cargo",
        "npm",
        "yarn",
        "pnpm",
        "bun",
        "git",
        "docker",
        "kubectl",
        "make",
        "pip",
        "python",
        "node",
        "export",
        "source",
        "echo",
        "cd",
        "ls",
        "cat",
        "mkdir",
        "rm",
        "cp",
        "mv",
        "chmod",
        "curl",
        "wget",
      ];
      const cmdMatch = remaining.match(
        new RegExp(`^(${commands.join("|")})\\b`),
      );
      if (cmdMatch) {
        tokens.push(
          <span key={key++} className={colors.command}>
            {cmdMatch[0]}
          </span>,
        );
        remaining = remaining.slice(cmdMatch[0].length);
        continue;
      }

      // Keywords
      const keywords = [
        "if",
        "then",
        "else",
        "fi",
        "for",
        "do",
        "done",
        "while",
        "until",
        "case",
        "esac",
        "function",
        "return",
        "exit",
        "true",
        "false",
      ];
      const keywordMatch = remaining.match(
        new RegExp(`^(${keywords.join("|")})\\b`),
      );
      if (keywordMatch) {
        tokens.push(
          <span key={key++} className={colors.keyword}>
            {keywordMatch[0]}
          </span>,
        );
        remaining = remaining.slice(keywordMatch[0].length);
        continue;
      }

      // Variables ($VAR or ${VAR})
      const varMatch = remaining.match(/^\$\{?[a-zA-Z_][a-zA-Z0-9_]*\}?/);
      if (varMatch) {
        tokens.push(
          <span key={key++} className={colors.variable}>
            {varMatch[0]}
          </span>,
        );
        remaining = remaining.slice(varMatch[0].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^-?\d+\.?\d*/);
      if (numMatch) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      // Path-like strings
      const pathMatch = remaining.match(
        /^(\/[a-zA-Z0-9_/.-]+|~\/[a-zA-Z0-9_/.-]+)/,
      );
      if (pathMatch) {
        tokens.push(
          <span key={key++} className={colors.stringAlt}>
            {pathMatch[0]}
          </span>,
        );
        remaining = remaining.slice(pathMatch[0].length);
        continue;
      }

      // Operators
      const opMatch = remaining.match(/^(&&|\|\||>>|<<|>|<|\||&|;|\\)/);
      if (opMatch) {
        tokens.push(
          <span key={key++} className={colors.operator}>
            {opMatch[0]}
          </span>,
        );
        remaining = remaining.slice(opMatch[0].length);
        continue;
      }

      // Regular words
      const wordMatch = remaining.match(/^[a-zA-Z0-9_.-]+/);
      if (wordMatch) {
        tokens.push(
          <span key={key++} className={colors.variable}>
            {wordMatch[0]}
          </span>,
        );
        remaining = remaining.slice(wordMatch[0].length);
        continue;
      }

      // Fallback
      tokens.push(
        <span key={key++} className={colors.punctuation}>
          {remaining[0]}
        </span>,
      );
      remaining = remaining.slice(1);
    }

    return <div key={i}>{tokens}</div>;
  });
}

// JSON highlighter
function highlightJSON(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, i) => {
    const tokens: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // Strings (keys and values)
      const stringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (stringMatch) {
        // Check if it's a key (followed by colon)
        const afterString = remaining.slice(stringMatch[0].length).trim();
        const isKey = afterString.startsWith(":");
        tokens.push(
          <span key={key++} className={isKey ? colors.property : colors.string}>
            {stringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^-?\d+\.?\d*([eE][+-]?\d+)?/);
      if (numMatch) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      // Booleans and null
      const boolMatch = remaining.match(/^(true|false|null)\b/);
      if (boolMatch) {
        tokens.push(
          <span key={key++} className={colors.keyword}>
            {boolMatch[0]}
          </span>,
        );
        remaining = remaining.slice(boolMatch[0].length);
        continue;
      }

      // Punctuation
      const punctMatch = remaining.match(/^[{}[\]:,]/);
      if (punctMatch) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            {punctMatch[0]}
          </span>,
        );
        remaining = remaining.slice(1);
        continue;
      }

      // Whitespace
      const wsMatch = remaining.match(/^\s+/);
      if (wsMatch) {
        tokens.push(<span key={key++}>{wsMatch[0]}</span>);
        remaining = remaining.slice(wsMatch[0].length);
        continue;
      }

      // Fallback
      tokens.push(
        <span key={key++} className={colors.variable}>
          {remaining[0]}
        </span>,
      );
      remaining = remaining.slice(1);
    }

    return <div key={i}>{tokens}</div>;
  });
}

// TOML highlighter (simplified)
function highlightTOML(code: string): ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, i) => {
    const tokens: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // Comments
      if (remaining.startsWith("#")) {
        tokens.push(
          <span key={key++} className={colors.comment}>
            {remaining}
          </span>,
        );
        break;
      }

      // Section headers
      const sectionMatch = remaining.match(/^\[[a-zA-Z0-9_.-]+\]/);
      if (sectionMatch) {
        tokens.push(
          <span key={key++} className={colors.function}>
            {sectionMatch[0]}
          </span>,
        );
        remaining = remaining.slice(sectionMatch[0].length);
        continue;
      }

      // Strings
      const stringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (stringMatch) {
        tokens.push(
          <span key={key++} className={colors.string}>
            {stringMatch[0]}
          </span>,
        );
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Keys (before =)
      const keyMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
      if (keyMatch) {
        tokens.push(
          <span key={key++} className={colors.property}>
            {keyMatch[1]}
          </span>,
        );
        remaining = remaining.slice(keyMatch[1].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^-?\d+\.?\d*/);
      if (numMatch) {
        tokens.push(
          <span key={key++} className={colors.number}>
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      // Booleans
      const boolMatch = remaining.match(/^(true|false)\b/);
      if (boolMatch) {
        tokens.push(
          <span key={key++} className={colors.keyword}>
            {boolMatch[0]}
          </span>,
        );
        remaining = remaining.slice(boolMatch[0].length);
        continue;
      }

      // Punctuation
      const punctMatch = remaining.match(/^[=.,]/);
      if (punctMatch) {
        tokens.push(
          <span key={key++} className={colors.punctuation}>
            {punctMatch[0]}
          </span>,
        );
        remaining = remaining.slice(1);
        continue;
      }

      // Fallback
      tokens.push(
        <span key={key++} className={colors.variable}>
          {remaining[0]}
        </span>,
      );
      remaining = remaining.slice(1);
    }

    return <div key={i}>{tokens}</div>;
  });
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors group"
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <svg
          className="w-4 h-4 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

export function CodeBlock({
  children,
  language = "typescript",
  showLineNumbers = false,
}: CodeBlockProps) {
  let highlighted: ReactNode[];

  switch (language) {
    case "python":
      highlighted = highlightPython(children);
      break;
    case "bash":
      highlighted = highlightBash(children);
      break;
    case "json":
      highlighted = highlightJSON(children);
      break;
    case "toml":
      highlighted = highlightTOML(children);
      break;
    case "typescript":
    default:
      highlighted = highlightTypeScript(children);
      break;
  }

  return (
    <div className="relative bg-[#111111] border border-neutral-800 p-4 font-mono text-sm overflow-x-auto rounded group">
      <CopyButton code={children} />
      <div className={showLineNumbers ? "flex" : ""}>
        {showLineNumbers && (
          <div className="pr-4 text-right select-none border-r border-neutral-800 mr-4">
            {children.split("\n").map((_, i) => (
              <div key={i} className="text-neutral-600">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <div>{highlighted}</div>
      </div>
    </div>
  );
}

// Convenience wrapper for bash commands
export function BashCode({ children }: { children: string }) {
  return <CodeBlock language="bash">{children}</CodeBlock>;
}

// Convenience wrapper for TypeScript
export function TSCode({ children }: { children: string }) {
  return <CodeBlock language="typescript">{children}</CodeBlock>;
}

// Convenience wrapper for Python
export function PythonCode({ children }: { children: string }) {
  return <CodeBlock language="python">{children}</CodeBlock>;
}

// Convenience wrapper for JSON
export function JSONCode({ children }: { children: string }) {
  return <CodeBlock language="json">{children}</CodeBlock>;
}

// Convenience wrapper for TOML
export function TOMLCode({ children }: { children: string }) {
  return <CodeBlock language="toml">{children}</CodeBlock>;
}
