# DEMO 5 · Triage headless: Claude Code como comando de Unix

Bloque del deck: 5 · Paralelo y sin mirar. Va antes de [EJ 12](../ejercicios/12-script-headless.md).

Cinco tickets entran por stdin, cinco JSON salen por stdout. Sin UI, sin sesión, sin manos:
`--allowedTools ""` no puede editar ni ejecutar nada. Un modelo chico y un techo de gasto.

## Antes

- Desde una terminal normal, fuera de la sesión de Claude Code, en la raíz del kit.
- `jq` instalado (sin `jq`, quitá los filtros y mirá el JSON crudo).
- `scripts/triage.sh` ya trae el loop y el schema (`scripts/triage.schema.json`); solo falta el prompt.

## Pasos

1. Exportá el prompt (abajo) y corré el script.
2. Mirá un ticket a la vez: `claude -p --model … --output-format json --json-schema … --allowedTools "" --max-budget-usd 0.25`.
3. `jq . triage.json`: un objeto por ticket con `key`, `tipo`, `severidad`, `resumen`.
4. Callout: **"Esto corre en un cron a las 7 y a las 7:05 hay un tablero."**

## Prompt exacto

```
export TRIAGE_PROMPT='Clasificá este ticket de sur-caja. Devolvé SOLO JSON con: key (SC-NNN), tipo (bug | feature | pregunta), severidad (alta | media | baja) y resumen (una línea, en español). Sin texto extra.'
./scripts/triage.sh && jq . triage.json
```

## Listo =

`triage.json` con cinco objetos validados por el schema (campo `structured_output` de la salida
JSON de Claude Code) y `git status` limpio: el script no editó nada.

## Si te trabás

- `budget_exhausted`: el techo tiene que cubrir el system prompt de Claude Code. Con Haiku alcanza
  con 0.25; con el modelo por defecto, 0.10 se agota antes de responder.
- Tarda más de 30 s el primer ticket: es red, no el script. Esperá o mirá `_preview/demo5-triage.json`.
