import { Request, Response } from 'express';
import { IsNull } from 'typeorm';
import { respuestaExito, respuestaError } from '../utils/responses';
import { Categorias } from '../models/categorias.model';

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
        where: { 
          id: Number(id),
          usuario: { id: req.usuario.id }
        },
        relations: {
          usuario: true,
        }
      });
      if (categoria) {
        respuestaExito<Categorias>(res, 200, '', categoria);
      } else {
        respuestaError(res, 404, 'Categoría no encontrada.');
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async modificar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultado = await Categorias.update(
        { 
          id: Number(id), 
          usuario: { id: req.usuario.id }
        },
        req.body
      );
      if (resultado.affected === 0) {
        respuestaError(res, 404, 'Categoría no encontrada.');
      } else {
        respuestaExito(res, 200, 'Categoría actualizada exitosamente.');  
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    } 
  }

  async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultado = await Categorias.delete({ 
        id: Number(id), 
        usuario: { id: req.usuario.id }
      });
      if (resultado.affected === 0) {
        respuestaError(res, 404, 'Categoría no encontrada.');
      } else {
        respuestaExito(res, 200, 'Categoría eliminada exitosamente.');
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    } 
  }

  async listar(req: Request, res: Response) {
    try {
      const categorias = await Categorias.find({
        where: [
          { usuario: { id: req.usuario.id } }, 
          { usuario: IsNull() }
        ],
      });
      if (categorias) {
        respuestaExito<Categorias[]>(res, 200, '', categorias);
      }
    } catch (error) {
      respuestaError(res, 500, 'Error al listar las categorías.', error.message);
    }
  }
}

export default new CategoriasController();