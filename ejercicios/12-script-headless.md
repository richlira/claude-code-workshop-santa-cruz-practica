# EJ 12 · Script headless (avanzado)

Bloque del deck: 5 · Paralelo y sin mirar. Viene después de [DEMO 5](../demos/05-triage-headless.md).

Claude Code adentro de un script. Sin UI, sin manos (`--allowedTools ""`), con un modelo chico,
un techo de gasto y salida JSON validada por schema. Eso es lo que ponés en un cron.

## Antes

- `jq` instalado (sin `jq`, quitá los filtros y mirá el JSON crudo).
- Desde una terminal normal, fuera de la sesión de Claude Code, en la raíz del kit.
- `! cat scripts/triage.sh`: el loop está, el prompt no.

## Pasos

1. Completá `PROMPT=` en `scripts/triage.sh` (o exportá `TRIAGE_PROMPT`).
2. `./scripts/triage.sh`
3. `jq . triage.json`
4. `git status` → limpio: el script no editó nada.

## Prompt exacto

```
export TRIAGE_PROMPT='Clasificá este ticket de sur-caja. Devolvé SOLO JSON con: key (SC-NNN), tipo (bug | feature | pregunta), severidad (alta | media | baja) y resumen (una línea, en español). Sin texto extra.'
./scripts/triage.sh && jq . triage.json
```

## Listo =

`triage.json` con un objeto por ticket (`key`, `tipo`, `severidad`, `resumen`) y `git status` limpio.

## Stretch

Ordená por severidad y escribí `triage.md` con una línea por ticket. Después: ¿qué pasa si sacás
`--allowedTools ""`? No lo corras en un cron sin eso.

## Si te trabás

- `budget_exhausted`: el techo tiene que cubrir el system prompt de Claude Code. Con Haiku alcanza 0.25.
- Salida vacía: el campo con el JSON validado es `structured_output` (variable `TRIAGE_FIELD`).
