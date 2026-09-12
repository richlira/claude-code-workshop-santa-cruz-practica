#!/usr/bin/env bash
# PostToolUse hook for Edit|Write: typecheck after every edit.
# Never blocks the session (|| true). Output lands in Claude's context.
cd "$(dirname "$0")/.." || exit 0
if command -v npx >/dev/null 2>&1; then
  npx -y typescript@5 tsc --noEmit 2>&1 | head -20 || true
else
  echo "tsc-check: npx not found, skipping" >&2
fi
exit 0
