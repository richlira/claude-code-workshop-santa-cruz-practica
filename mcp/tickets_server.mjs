#!/usr/bin/env node
// Minimal MCP server (stdio, JSON-RPC) with zero dependencies.
// Exposes the fake ticket tracker in ../tickets/ as tools, so /repro can
// fetch a ticket "like Jira" during the workshop demo.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "tickets");
const tools = [
  { name: "list_tickets", description: "List ticket keys and titles.", inputSchema: { type: "object", properties: {} } },
  { name: "get_ticket", description: "Return the full markdown of one ticket by key, e.g. SC-102.",
    inputSchema: { type: "object", properties: { key: { type: "string" } }, required: ["key"] } },
];

function call(name, args) {
  if (name === "list_tickets") {
    const rows = readdirSync(DIR).filter((f) => f.endsWith(".md")).map((f) => {
      const title = readFileSync(join(DIR, f), "utf8").split("\n")[0].replace(/^#\s*/, "");
      return `${f.replace(".md", "")}: ${title}`;
    });
    return rows.join("\n");
  }
  if (name === "get_ticket") {
    const key = String(args?.key ?? "").toUpperCase();
    if (!/^SC-\d+$/.test(key)) throw new Error(`invalid key: ${key}`);
    return readFileSync(join(DIR, `${key}.md`), "utf8");
  }
  throw new Error(`unknown tool: ${name}`);
}

const send = (msg) => process.stdout.write(JSON.stringify(msg) + "\n");
createInterface({ input: process.stdin }).on("line", (line) => {
  if (!line.trim()) return;
  const req = JSON.parse(line);
  const { id, method, params } = req;
  if (id === undefined) return; // notifications (initialized, cancelled): nothing to answer
  try {
    if (method === "initialize") {
      send({ jsonrpc: "2.0", id, result: { protocolVersion: params?.protocolVersion ?? "2025-06-18",
        capabilities: { tools: {} }, serverInfo: { name: "tickets", version: "0.1.0" } } });
    } else if (method === "tools/list") {
      send({ jsonrpc: "2.0", id, result: { tools } });
    } else if (method === "tools/call") {
      const text = call(params.name, params.arguments);
      send({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
    } else if (method === "ping") {
      send({ jsonrpc: "2.0", id, result: {} });
    } else {
      send({ jsonrpc: "2.0", id, error: { code: -32601, message: `method not found: ${method}` } });
    }
  } catch (e) {
    send({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text: String(e.message ?? e) }], isError: true } });
  }
});
