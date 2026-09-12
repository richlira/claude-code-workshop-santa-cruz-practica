#!/usr/bin/env bash
# Put the repo back to the workshop starting state (like Keon's reset-demo.sh).
set -e
cd "$(dirname "$0")"
git checkout -- src test CLAUDE.md .claude/commands/pr.md mcp .claude/rules 2>/dev/null || true
rm -f test/repro_*.test.ts test/conciliar.test.ts
rm -f .claude/settings.json .claude/settings.local.json
rm -rf .claude/plans
rm -rf .claude/skills/conciliar-report          # EJ 11 (tu skill)
rm -f .claude/agents/refactorizador.md          # EJ 13 / DEMO 6 (subagent aislado)
rm -rf agent/out                                # EJ 14 / DEMO 7 (SDK); agent/node_modules se conserva
rm -f REPORTE.md triage.json triage.md PLAN.md  # EJ 11 · EJ 12 · Demo C

# Worktrees que dejó el subagent con isolation: worktree (EJ 13 / DEMO 6): se borran
# junto con su rama. Nunca main ni feat/curso.
main_wt="$(git rev-parse --show-toplevel)"
git worktree list --porcelain | awk '/^worktree /{wt=$2} /^branch /{print wt" "$2}' | while read -r wt br; do
  [ "$wt" = "$main_wt" ] && continue
  git worktree remove --force "$wt" 2>/dev/null || true
  br="${br#refs/heads/}"
  case "$br" in main|feat/curso) ;; *) git branch -D "$br" 2>/dev/null || true ;; esac
done
git worktree prune
rm -rf .claude/worktrees

git status --short
echo "sur-caja: reset. npm test should show 1 red (SC-101)."
