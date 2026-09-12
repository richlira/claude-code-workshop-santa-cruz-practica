import { pagos, pedidos } from "./db.ts";
import type { Pago } from "./tipos.ts";

export function crearPago(pedidoId: string, montoBob: number): Pago {
  const pedido = pedidos.get(pedidoId);
  if (!pedido) throw new Error("pedido_inexistente");
  if (montoBob !== pedido.totalBob) throw new Error("monto_no_coincide");

  const pago: Pago = {
    id: crypto.randomUUID(),
    pedidoId,
    montoBob,
    estado: "pendiente",
    creadoEn: new Date().toISOString(),
    pagadoEn: null,
  };
  pagos.set(pago.id, pago);
  return pago;
}

export function marcarPagado(pagoId: string, pagadoEnIso: string): Pago {
  const pago = pagos.get(pagoId);
  if (!pago) throw new Error("pago_inexistente");

  // Business rule: a QR payment must be confirmed on the same calendar day
  // (caja diaria) it was created. Otherwise it is a different cierre.
  const diaPago = pagadoEnIso.slice(0, 10);
  const diaCreado = pago.creadoEn.slice(0, 10);
  if (diaPago !== diaCreado) throw new Error("fecha_invalida");

  pago.estado = "pagado";
  pago.pagadoEn = pagadoEnIso;
  const pedido = pedidos.get(pago.pedidoId);
  if (pedido) pedido.estado = "cobrado";
  return pago;
}
