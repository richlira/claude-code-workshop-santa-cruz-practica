#!/usr/bin/env bash
# EJ 10 · Triage headless: clasifica cada ticket de tickets/ con `claude -p`
# y deja triage.json con un objeto por ticket (key, tipo, severidad, resumen).
#
# Claude Code como comando de Unix: sin UI, sin sesión, sin manos.
#   --allowedTools ""        no puede editar ni ejecutar nada (solo clasifica)
#   --output-format json     resultado + costo + turnos, parseable
#   --json-schema            la salida tiene la forma que este script espera
#   --max-budget-usd         techo de gasto por ticket
#   --model                  un modelo chico: clasificar no necesita al grande (y el techo
#                            tiene que cubrir el system prompt de Claude Code: con el modelo
#                            por defecto, 0.10 USD se agota antes de responder)
#
# Completá PROMPT (o exportá TRIAGE_PROMPT) y corrélo desde fuera de la sesión:
#   ./scripts/triage.sh && jq . triage.json
# Necesita jq. Sin jq: quitá los filtros y mirá el JSON crudo.
set -euo pipefail
cd "$(dirname "$0")/.."

PROMPT="${TRIAGE_PROMPT:-[COMPLETAR: qué clasificar, qué campos, solo JSON]}"
if [[ "$PROMPT" == *COMPLETAR* ]]; then
  echo "triage.sh: completá PROMPT= en scripts/triage.sh (o exportá TRIAGE_PROMPT)." >&2
  exit 1
fi

SCHEMA="$(cat scripts/triage.schema.json)"
MODEL="${TRIAGE_MODEL:-claude-haiku-4-5-20251001}"   # chico y barato; /model muestra los nombres del día
BUDGET="${TRIAGE_BUDGET:-0.25}"                       # USD por ticket; con haiku sale ~0.05
FIELD="${TRIAGE_FIELD:-structured_output}"            # campo con la salida validada (verificado 2026-09-12, CC 2.1.269)

for t in tickets/SC-*.md; do
  echo "→ $t" >&2
  claude -p \
    --model "$MODEL" \
    --output-format json \
    --json-schema "$SCHEMA" \
    --allowedTools "" \
    --max-budget-usd "$BUDGET" \
    "$PROMPT" < "$t" | jq -c ".${FIELD}"
done | jq -s . > triage.json

echo "triage.json: $(jq length triage.json) tickets" >&2
