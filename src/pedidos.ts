import { pedidos } from "./db.ts";
import type { Pedido } from "./tipos.ts";

export function crearPedido(totalBob: number): Pedido {
  if (totalBob <= 0) throw new Error("total_invalido");
  const p: Pedido = {
    id: crypto.randomUUID(),
    totalBob,
    estado: "abierto",
    creadoEn: new Date().toISOString(),
  };
  pedidos.set(p.id, p);
  return p;
}

export function getPedido(id: string): Pedido | undefined {
  return pedidos.get(id);
}
