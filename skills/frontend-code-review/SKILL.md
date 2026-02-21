---
name: frontend-code-review
description: >
  Code review skill for Bun + TypeScript + Vite + React frontends.
  Trigger when a user asks to review, audit, or check their frontend code for
  quality, correctness, security, or maintainability.
---

# Frontend Code Review Skill

Use this skill when the user asks to review frontend code - React components,
hooks, utilities, config files, or entire directories - built with the stack:
**Bun - TypeScript - Vite - React**.

---

## Trigger Phrases

- "Can you review this component?"
- "Review my code / check my code"
- "Is there anything wrong with this file?"
- "Code review please"
- "Audit this for security / performance / best practices"

---

## Review Philosophy

> Find things that matter. Skip the noise.

The goal is a review a senior engineer would be proud to give - not a linter
dump. Every finding should save real pain: a future bug, a security incident,
a slow render, a refactor nightmare. If something is fine, say nothing about it.

**Do not**:
- Flag style opinions that aren't enforced by the project
- Be clever or pedantic
- Invent problems to seem thorough
- Suggest rewrites for code that works and is clear

---

## Review Checklist (apply in order of impact)

### 1. Architecture & Modularity
- Is logic split into small, focused units? A React component **over ~200 lines** warrants a note; **over 400 lines** is almost always a problem worth flagging.
- Are there duplicated blocks of logic that should be extracted into a shared hook, utility, or component?
- Are concerns separated cleanly (data fetching / state / UI / side-effects)?
- Is anything in one file that clearly belongs in another?

### 2. Security
- Are there any XSS risks? (`dangerouslySetInnerHTML`, unescaped user input rendered as HTML)
- Are secrets or API keys hard-coded or exposed to the client bundle? (Vite: only `VITE_` prefixed vars belong in client code)
- Is user-supplied data validated/sanitized before use?
- Are there any obvious CSRF, open redirect, or prototype pollution risks?
- Are third-party dependencies being loaded from untrusted CDNs without integrity checks?

### 3. React Best Practices
- Missing or incorrect dependency arrays in `useEffect`, `useMemo`, `useCallback`
- State being mutated directly instead of via setter
- Keys on list items: missing, using array index when the list can reorder
- Prop drilling 3+ levels deep that should use context or a state manager
- Expensive computations inside render that should be memoized
- `useEffect` used for derived state (just compute it during render)
- Components doing too many things - split them

### 4. TypeScript Correctness
- `any` types that are masking real type errors
- Type assertions (`as Foo`) that are unsafe and could be narrowed properly
- Missing null/undefined guards before property access
- Return types on exported functions / hooks not declared

### 5. Performance & Efficiency
- Unnecessary re-renders: object/array literals created inline as props, missing `useMemo`/`useCallback` on stable values passed to memoized children
- Large imports from libraries where tree-shaking won't kick in (e.g., `import _ from 'lodash'` instead of `import debounce from 'lodash/debounce'`)
- Vite-specific: dynamic imports / lazy loading opportunities for heavy routes or components
- Images without explicit width/height causing layout shift
- Synchronous operations that could be async / deferred

### 6. Code Clarity
- Function and variable names that don't communicate intent
- Logic that requires significant mental effort to trace - add a comment or simplify
- Dead code (unused vars, unreachable branches, commented-out blocks)
- Magic numbers/strings that should be named constants

### 7. Bun-specific
- Using Node-only APIs that don't work in Bun (e.g., some `node:crypto` patterns)
- Scripts in `package.json` that should use `bun` instead of `npm run` or `node`
- Bun's native APIs (e.g., `Bun.file`, `Bun.serve`) ignored where they'd replace heavier deps

---

## Output Format

Structure the review as follows. If a section has no findings, omit it entirely
(don't write "No issues found" for every category - that's noise).

```
## Code Review

### Critical  ⛔
> Issues that will or very likely will cause bugs, security holes, or data loss.
[finding - what it is, why it matters, concise fix]

### Important  ⚠️
> Things that will cause real pain down the road: maintainability, performance,
> subtle bugs.
[finding - what it is, why it matters, concise fix]

### Minor  💡
> Worth knowing but won't hurt you soon.
[finding - what it is, why it matters, concise fix]

### Summary
One short paragraph: overall code health, the one or two things most worth
fixing first.
```

**Guidelines:**
- Lead each finding with the file name + line number (if known): `ProfileCard.tsx:87`
- Show a before/after snippet only when the fix isn't obvious from the description
- Keep snippets short - 5-15 lines max
- Prefer prose over bullet sub-lists within a finding
- If the file is genuinely solid, say so briefly and stop

---

## Example Finding (well-formatted)

> **`useEffect` missing dependency - `SearchBar.tsx:34`**
> The effect references `query` but it's not in the dependency array. This means
> the effect runs only on mount and stale data will be used on subsequent renders.
>
> ```ts
> // Before
> useEffect(() => { fetchResults(query) }, [])
>
> // After
> useEffect(() => { fetchResults(query) }, [query])
> ```

---

## Things NOT to Flag

- Minor whitespace / formatting (that's what Prettier is for)
- Personal naming preferences when the existing name is reasonable
- Suggesting a completely different architecture when the current one works fine
- Anything already handled by a linter the project clearly uses
- Whether to use `function` vs arrow function syntax (not meaningful)

---

## If Multiple Files Are Provided

Review each file, then give a cross-file summary noting any patterns that span
the codebase (e.g., "Prop drilling is consistent across 3 components - worth
introducing a context here").
