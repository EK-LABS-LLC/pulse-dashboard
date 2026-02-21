# Pulse Dashboard

React + Vite frontend for the Pulse trace service. It talks to the backend over HTTP (Better Auth sessions + `/dashboard/api/*`).

## Local development

```bash
bun install
cp .env.example .env.local # optional
bun run dev
```

By default the dev server proxies API calls to `http://localhost:3000`. Override the backend URL by setting:

- `VITE_API_BASE_URL` – the Pulse API origin that the browser should call in production builds.
- `VITE_API_PROXY_TARGET` – (optional) dev-server proxy target when the API is not on `localhost:3000`.

## Production build

```bash
bun run build
```

Deploy the resulting `dist/` directory to your static hosting provider (Vercel, Netlify, S3+CloudFront, etc.) and set `VITE_API_BASE_URL` to your deployed trace-service origin.

## Docker image

Build locally:

```bash
make docker-build
```

Run locally:

```bash
make docker-run
```

Useful make vars:

- `IMAGE` (default `pulse-dashboard:local`)
- `CONTAINER` (default `pulse-dashboard`)
- `PORT` (default `8080`)

Example:

```bash
make docker-build IMAGE=ghcr.io/ek-labs-llc/pulse-dashboard:v0.2.1
make docker-run IMAGE=ghcr.io/ek-labs-llc/pulse-dashboard:v0.2.1 PORT=8080
```

### Runtime env vars

The image supports runtime API base URL injection:

- `PULSE_API_BASE_URL` (optional): Browser API origin for `/api/auth/*`, `/dashboard/api/*`, `/v1/*`.

If omitted, the dashboard falls back to `window.location.origin`, which is ideal for same-origin deployments.

Example (split origin):

```bash
make docker-run PULSE_API_BASE_URL="https://api.example.com"
```

Stop/logs:

```bash
make docker-stop
make docker-logs
```

## Recommended deployment model

For self-hosted production, prefer same-origin routing behind your reverse proxy:

- `https://pulse.example.com/` -> dashboard container
- `https://pulse.example.com/api/auth/*` -> `pulse-server`
- `https://pulse.example.com/dashboard/api/*` -> `pulse-server`
- `https://pulse.example.com/v1/*` -> `pulse-server`

This avoids cross-origin cookie/CORS issues and usually requires no `PULSE_API_BASE_URL`.

## Release image publishing

On tag push (`v*`), GitHub Actions publishes multi-arch images to GHCR:

- `ghcr.io/<org>/pulse-dashboard:vX.Y.Z`
- `ghcr.io/<org>/pulse-dashboard:sha-...`

Use the same version tag as `trace-service` when possible.
