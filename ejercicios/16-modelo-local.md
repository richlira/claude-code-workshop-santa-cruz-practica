# EJ 16 · Claude Code contra un modelo local (avanzado)

Bloque del deck: 7 · Local. Viene después de [DEMO 8](../demos/08-modelo-local.md).

Cero datos afuera. Claude Code manda `POST /v1/messages`; si tu server lo habla (Ollama lo hace
nativo), Claude Code no sabe que no es Anthropic. Cambiás el modelo del medio y dejás todo lo de
alrededor.

## Antes

- Ollama instalado (versión reciente, con `ollama launch claude`) y un modelo chico ya descargado
  y corrido una vez (`ollama run <modelo> "hi"`).
- Salí de cualquier sesión de `claude` abierta. `cd sur-caja`.

## Pasos

1. Lanzá Claude Code apuntando a Ollama (abajo).
2. El prompt corto. Si tarda dos minutos, son dos minutos: es el trade-off, no un bug.
3. `/model` → ¿dice el modelo local?
4. Leé la respuesta con ojo crítico: ¿inventó algo?

## Prompt exacto

```
OLLAMA_CONTEXT_LENGTH=32768 ollama launch claude --model <modelo-chico>
```

```
explain src/pagos.ts in 5 lines
```

## Listo =

Una respuesta del modelo local adentro de Claude Code, con el modelo local en `/model`.

## Stretch

Salí y relanzá con las variables a mano (lo que `ollama launch claude` hace por debajo; sirve
igual para vLLM o un proxy):

```
OLLAMA_CONTEXT_LENGTH=32768 ollama serve   # si no está corriendo
ANTHROPIC_BASE_URL=http://localhost:11434 ANTHROPIC_AUTH_TOKEN=ollama \
ANTHROPIC_MODEL=<modelo> ANTHROPIC_DEFAULT_OPUS_MODEL=<modelo> \
ANTHROPIC_DEFAULT_SONNET_MODEL=<modelo> ANTHROPIC_DEFAULT_HAIKU_MODEL=<modelo> \
CLAUDE_CODE_MAX_CONTEXT_TOKENS=32768 claude
```

## Si te trabás

- Responde basura o corta: contexto en 4k. Relanzá con `OLLAMA_CONTEXT_LENGTH=32768` (en la app de
  escritorio de Ollama, Settings).
- `404 model not found`: faltan las variables `ANTHROPIC_DEFAULT_*_MODEL`.
- Laptop de 16 GB: el modelo chico es el techo. Con 32 GB podés probar uno de 20B.
