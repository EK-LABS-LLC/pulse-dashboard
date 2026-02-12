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
