#!/usr/bin/env bash
# Put the repo back to the workshop starting state (like Keon's reset-demo.sh).
set -e
cd "$(dirname "$0")"
git checkout -- src test CLAUDE.md .claude/commands/pr.md 2>/dev/null || true
rm -f test/repro_*.test.ts
rm -f .claude/settings.json .claude/settings.local.json
rm -rf .claude/plans
git status --short
echo "sur-caja: reset. npm test should show 1 red (SC-101)."
