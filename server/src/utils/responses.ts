import { Response } from 'express';

export function respuestaExito<T>(res: Response, status: number = 200, mensaje: string = 'Operación realizada con éxito.', data: T | null = null): void {
  res.status(status).json({
    ok: true,
    status,
    mensaje,
    data
  });
}

export function respuestaError(res: Response, status: number = 500, mensaje: string = 'Error interno del servidor.', detalles = null) {
  res.status(status).json({
    ok: false,
    status,
    mensaje,
    detalles
  });
}