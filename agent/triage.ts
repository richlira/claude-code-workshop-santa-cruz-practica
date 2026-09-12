// DEMO 7 · EJ 14 · EJ 15 — Triage de tickets con el Claude Agent SDK.
//
// El mismo harness de Claude Code (loop, tools, permisos, hooks, MCP) como librería:
// entra "clasificá los tickets", sale out/triage.json. Sin UI, sin sesión interactiva.
// Node 22.18+ corre este .ts directo (type stripping): npm run triage
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

// El Agent SDK se autentica con una API key de platform.claude.com (Console).
// No es el login de claude.ai que usa `claude` en la terminal.
if (!process.env.ANTHROPIC_API_KEY && process.env.SURCAJA_AUTH !== "cli") {
  console.error(
    "El Agent SDK usa una API key de platform.claude.com, no el login de claude.ai.\n" +
    "Exportá ANTHROPIC_API_KEY y volvé a correr:  export ANTHROPIC_API_KEY=sk-ant-...  && npm run triage"
  );
  process.exit(1);
}

const AGENT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO = join(AGENT_DIR, "..");            // la raíz de sur-caja: ahí está tickets/

// ---- 1. La tool propia ES el contrato de salida -----------------------------------
// Con zod declarás la forma; el modelo no puede "registrar" algo que no cumpla el schema.
type Triage = { key: string; tipo: "bug" | "feature" | "pregunta"; severidad: "alta" | "media" | "baja"; resumen: string };
const registrados: Triage[] = [];

const registrar = tool(
  "registrar_triage",
  "Registra la clasificación de UN ticket de sur-caja. Llamala una vez por ticket.",
  {
    key: z.string().regex(/^SC-\d{3}$/, "formato SC-NNN"),
    tipo: z.enum(["bug", "feature", "pregunta"]),
    severidad: z.enum(["alta", "media", "baja"]),
    resumen: z.string().max(140, "una línea"),
  },
  async (args) => {
    registrados.push(args);
    return { content: [{ type: "text", text: `registrado ${args.key}` }] };
  },
);

// EJ 15: agregá acá dos tools más y el agente deja de necesitar Read/Glob/Grep:
//   listar_tickets()  → lee tickets/ con readdirSync y devuelve las keys
//   leer_ticket(key)  → devuelve el markdown de tickets/<key>.md
// Después cambiá allowedTools (abajo) para que SOLO pueda usar mcp__surcaja__*.

// Un MCP server en el mismo proceso: cero puertos, cero stdio, cero deps extra.
// Sus tools se llaman mcp__<server>__<tool>  →  mcp__surcaja__registrar_triage
const surcaja = createSdkMcpServer({ name: "surcaja", version: "1.0.0", tools: [registrar] });

// ---- 2. El loop, con las mismas riendas que en la terminal --------------------------
const PROMPT =
  "Leé todos los tickets en tickets/ (SC-*.md) y clasificá cada uno con registrar_triage: " +
  "tipo (bug | feature | pregunta), severidad (alta | media | baja) y un resumen de una línea en español.";

const stream = query({
  prompt: PROMPT,
  options: {
    cwd: REPO,                                   // el repo que el agente ve
    systemPrompt: {                              // el system prompt de Claude Code + tu párrafo
      type: "preset",
      preset: "claude_code",
      append: "Sos el triage de sur-caja. Para CADA ticket de tickets/ llamá registrar_triage exactamente una vez. En español.",
    },
    // EJ 15: dejá solo ["mcp__surcaja__listar_tickets", "mcp__surcaja__leer_ticket", "mcp__surcaja__registrar_triage"]
    allowedTools: ["Read", "Glob", "Grep", "mcp__surcaja__registrar_triage"],  // pre-aprobadas
    disallowedTools: ["Bash", "Edit", "Write"], // un clasificador no tiene manos
    permissionMode: "dontAsk",                   // sin humano: lo que no está pre-aprobado se niega
    settingSources: ["project"],                 // carga CLAUDE.md y .claude/ del repo (y nada de ~/.claude)
    mcpServers: { surcaja },                     // tus tools
    model: "claude-haiku-4-5",                   // clasificar no necesita al grande
    maxTurns: 40,                                // techo de vueltas del loop
    maxBudgetUsd: 0.5,                           // techo de gasto (cubre también subagents)
    hooks: {                                     // el mismo contrato que un hook en settings.json
      PreToolUse: [{
        hooks: [async (input) => {
          const tool_input = "tool_input" in input ? input.tool_input : undefined;
          if (JSON.stringify(tool_input ?? "").includes(".env")) {
            return {
              hookSpecificOutput: {
                hookEventName: "PreToolUse",
                permissionDecision: "deny",
                permissionDecisionReason: "Política del equipo: .env está fuera de alcance",
              },
            };
          }
          return {};
        }],
      }],
    },
  },
});

// ---- 3. El stream: lo que en la terminal ves dibujado, acá te llega como objetos -------
for await (const m of stream) {
  const subtype = "subtype" in m && m.subtype ? `/${m.subtype}` : "";
  console.log(`· ${m.type}${subtype}`);
  if (m.type === "assistant") {
    for (const block of m.message.content) {
      if (block.type === "text") console.log(`  ${block.text.trim()}`);
      if (block.type === "tool_use") console.log(`  → tool ${block.name}`);
    }
  }
  if (m.type === "result") {
    if (m.subtype === "success") console.log(`\n${m.result}\n`);
    console.log(`costo: $${m.total_cost_usd.toFixed(4)} · turnos: ${m.num_turns} · session: ${m.session_id}`);
    if (m.subtype !== "success") console.error(`terminó con ${m.subtype}`);
  }
}

// ---- 4. La salida: lo que llegó por la tool, ordenado -------------------------------
if (registrados.length === 0) {
  console.error("No se registró ningún ticket: revisá el prompt y allowedTools.");
  process.exit(2);
}
registrados.sort((a, b) => a.key.localeCompare(b.key));
mkdirSync(join(AGENT_DIR, "out"), { recursive: true });
writeFileSync(join(AGENT_DIR, "out", "triage.json"), JSON.stringify(registrados, null, 2) + "\n");
console.log(`out/triage.json: ${registrados.length} tickets`);
