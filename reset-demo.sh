#!/usr/bin/env bash
# Put the repo back to the workshop starting state (like Keon's reset-demo.sh).
set -e
cd "$(dirname "$0")"
git checkout -- src test CLAUDE.md .claude/commands/pr.md 2>/dev/null || true
rm -f test/repro_*.test.ts test/conciliar.test.ts
rm -f .claude/settings.json .claude/settings.local.json
rm -rf .claude/plans
rm -rf .claude/skills/conciliar-report          # EJ 9
rm -f REPORTE.md triage.json triage.md PLAN.md  # EJ 9 · EJ 10 · Demo C
git status --short
echo "sur-caja: reset. npm test should show 1 red (SC-101)."
