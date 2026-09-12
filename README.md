# sur-caja

Small orders + QR payments API for a shop in Santa Cruz. Fictional. Built for the
Claude Code workshop (AgenTICs 2026). Not a product.

    npm test        # node:test, no install needed on Node >= 22.18
    npm start       # http server on :3333

There is one bug planted (SC-101) and one feature missing (SC-102). See `tickets/`.
SC-103 is for `/repro`; SC-104 and SC-105 exist so the headless triage (`scripts/triage.sh`)
has five tickets to classify.

Workshop pieces:

    .claude/skills/repro/SKILL.md      /repro <ticket> → one failing test, no fix
    .claude/commands/pr.md             stub: you complete it in the workshop
    .claude/settings.example.json      PostToolUse hook → hooks/tsc-check.sh (copy to settings.json)
    .mcp.json + mcp/tickets_server.mjs zero-dep MCP server over tickets/
    scripts/triage.sh                  claude -p + --json-schema over tickets/ (complete PROMPT first)
    reset-demo.sh                      back to the starting state
