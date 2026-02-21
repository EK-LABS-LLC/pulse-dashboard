#!/bin/sh
set -eu

CONFIG_PATH="/usr/share/nginx/html/runtime-config.js"
API_BASE_URL="${PULSE_API_BASE_URL:-}"

if [ -z "$API_BASE_URL" ]; then
  cat >"$CONFIG_PATH" <<'EOF'
window.__PULSE_CONFIG = window.__PULSE_CONFIG || {};
EOF
  exit 0
fi

# Escape quotes and backslashes so URL is valid JS string literal.
ESCAPED_URL="$(printf '%s' "$API_BASE_URL" | sed 's/\\/\\\\/g; s/"/\\"/g')"

cat >"$CONFIG_PATH" <<EOF
window.__PULSE_CONFIG = Object.assign({}, window.__PULSE_CONFIG, {
  apiBaseUrl: "${ESCAPED_URL}"
});
EOF
