import { test } from "node:test";
import assert from "node:assert/strict";
import { pagos } from "../src/db.ts";
import { crearPedido } from "../src/pedidos.ts";
import { crearPago, marcarPagado } from "../src/pagos.ts";

// Rule: a QR payment is confirmed on the same calendar day it was created
// (caja diaria). "Calendar day" means Santa Cruz (America/La_Paz, UTC-4),
// not UTC. See tickets/SC-101.md.

function pagoCreadoEn(iso: string) {
  const pedido = crearPedido(50);
  const pago = crearPago(pedido.id, 50);
  pago.creadoEn = iso;
  pagos.set(pago.id, pago);
  return pago;
}

test("SC-101: creado 18:00 y pagado 22:00 hora Santa Cruz es el mismo día de caja", () => {
  // 18:00 SCZ = 22:00Z · 22:00 SCZ = 02:00Z of the NEXT UTC day
  const pago = pagoCreadoEn("2026-09-19T22:00:00.000Z");
  const out = marcarPagado(pago.id, "2026-09-20T02:00:00.000Z");
  assert.equal(out.estado, "pagado");
});

test("SC-101: pagar al día siguiente (hora Santa Cruz) sigue siendo inválido", () => {
  // 18:00 SCZ 19th → 11:00 SCZ 20th: different caja
  const pago = pagoCreadoEn("2026-09-19T22:00:00.000Z");
  assert.throws(() => marcarPagado(pago.id, "2026-09-20T15:00:00.000Z"), /fecha_invalida/);
});
