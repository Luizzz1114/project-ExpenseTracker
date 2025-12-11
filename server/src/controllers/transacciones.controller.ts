import { Request, Response } from "express";
import { respuestaExito, respuestaError } from "../helpers/responses";
import { Transacciones } from "../models/transacciones.model";

class TransaccionesController {

  async crear(req: Request, res: Response) {
    try {
      const nuevaTransaccion = await Transacciones.save(req.body);
      if (nuevaTransaccion) {
        respuestaExito<Transacciones>(res, 201, 'Transacción registrada con exito.');
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async leer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaccion = await Transacciones.findOne({
        where: { id: Number(id) },
        relations: {
          usuario: true,
        }
      });
      if (transaccion) {
        respuestaExito<Transacciones>(res, 200, '', transaccion);
      } else {
        respuestaError(res, 400, 'Transacción no encontrada.');
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async modificar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Transacciones.update(Number(id), req.body);
      respuestaExito(res, 200, 'Transacción actualizada exitosamente.');
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    } 
  }

  async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Transacciones.delete(Number(id));
      respuestaExito(res, 200, 'Transacción eliminada exitosamente.');
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    } 
  }

  async listar(req: Request, res: Response) {
    try {
      const transacciones = await Transacciones.find();
      if (transacciones) {
        respuestaExito<Transacciones[]>(res, 200, '', transacciones);
      }
    } catch (error) {
      respuestaError(res, 500, 'Error al listar las Transaccións.', error.message);
    }
  }
}

export default new TransaccionesController();