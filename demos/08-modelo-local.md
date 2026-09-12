# DEMO 8 · Claude Code contra un modelo local

Bloque del deck: 7 · Local. Va antes de [EJ 16](../ejercicios/16-modelo-local.md).

Mismo Claude Code, mismo repo, otro backend: un modelo abierto de 35B corriendo en una caja
propia (en la demo, un DGX Spark por Tailscale; en tu laptop, Ollama con un modelo chico).
Más lento, menos fino, cero tokens facturados, cero datos afuera.

## Antes

- Ollama corriendo con el modelo cargado (`ollama ps`). Versión reciente: hace falta
  `ollama launch claude`.
- `OLLAMA_CONTEXT_LENGTH=32768`: el default de 4k trunca el system prompt de Claude Code.
- Salir de cualquier sesión de `claude` abierta.

## Pasos

1. `cd sur-caja` y lanzar Claude Code apuntando a Ollama (abajo).
2. El prompt corto. Si tarda dos minutos, son dos minutos: es el trade-off, no un bug.
3. `/model` → tiene que decir el modelo local.
4. Leé la respuesta con ojo crítico. En el ensayo, un 20B explicó bien y se inventó un bug
   ("falta importar crypto": `crypto.randomUUID()` es global en Node ≥ 19).

## Prompt exacto

```
OLLAMA_CONTEXT_LENGTH=32768 ollama launch claude --model <modelo>
```

```
explain src/pagos.ts in 5 lines and tell me if there is a bug
```

Lo que `ollama launch claude` hace por debajo (sirve igual para vLLM o un proxy):

```
ANTHROPIC_BASE_URL=http://localhost:11434
ANTHROPIC_AUTH_TOKEN=ollama
ANTHROPIC_MODEL=<modelo>
ANTHROPIC_DEFAULT_OPUS_MODEL=<modelo>
ANTHROPIC_DEFAULT_SONNET_MODEL=<modelo>
ANTHROPIC_DEFAULT_HAIKU_MODEL=<modelo>
CLAUDE_CODE_MAX_CONTEXT_TOKENS=32768
claude
```

## Listo =

Una respuesta del modelo local adentro de Claude Code, con el modelo local en `/model`, y el
archivo leído por tool use (no pegado).

## Si te trabás

- Responde basura o corta: el contexto quedó en 4k. Relanzá con `OLLAMA_CONTEXT_LENGTH=32768`
  (en la app de escritorio de Ollama se configura en Settings).
- `404 model not found`: faltan las variables `ANTHROPIC_DEFAULT_*_MODEL`; Claude Code pide
  `claude-*` y el server no lo tiene.
- Aviso "isn't described by this version's model catalog": inofensivo; por eso va
  `CLAUDE_CODE_MAX_CONTEXT_TOKENS=32768`.
