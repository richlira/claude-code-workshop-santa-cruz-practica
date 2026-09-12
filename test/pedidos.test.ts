import { test } from "node:test";
import assert from "node:assert/strict";
import { crearPedido, getPedido } from "../src/pedidos.ts";

test("crea un pedido con total válido", () => {
  const p = crearPedido(35.5);
  assert.equal(p.estado, "abierto");
  assert.equal(getPedido(p.id)?.totalBob, 35.5);
});
