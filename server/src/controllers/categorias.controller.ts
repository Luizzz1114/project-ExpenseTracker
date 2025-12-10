import { Request, Response } from "express";
import { respuestaExito, respuestaError } from "../helpers/responses";
import { Categorias } from "../models/categorias.model";

class CategoriasController {

  async crear(req: Request, res: Response) {
    try {
      const nuevaCategoria = await Categorias.save(req.body);
      if (nuevaCategoria) {
        respuestaExito<Categorias>(res, 201, 'Categoría registrada con exito.');
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async leer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoria = await Categorias.findOne({
        where: { id: Number(id) },
        relations: {
          usuario: true,
        }
      });
      if (categoria) {
        respuestaExito<Categorias>(res, 200, '', categoria);
      } else {
        respuestaError(res, 400, 'Categoría no encontrada.');
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async modificar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Categorias.update(Number(id), req.body);
      respuestaExito(res, 200, 'Categoría actualizada exitosamente.');
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    } 
  }

  async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Categorias.delete(Number(id));
      respuestaExito(res, 200, 'Categoría eliminada exitosamente.');
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    } 
  }

  async listar(req: Request, res: Response) {
    try {
      const nuevaCategoria = await Categorias.find();
      if (nuevaCategoria) {
        respuestaExito<Categorias[]>(res, 200, '', nuevaCategoria);
      }
    } catch (error) {
      respuestaError(res, 500, 'Error al listar las categorías.', error.message);
    }
  }
}

export default new CategoriasController();