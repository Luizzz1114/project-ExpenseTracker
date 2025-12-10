import { Request, Response } from "express";
import { respuestaExito, respuestaError } from "../helpers/responses";
import { Usuarios } from "../models/usuarios.model";

class UsuariosController {

  async crear(req: Request, res: Response) {
    try {
      const nuevoUsuario = await Usuarios.save(req.body);
      if (nuevoUsuario) {
        respuestaExito<Usuarios>(res, 201, 'Usuario creado exitosamente.', nuevoUsuario);
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async leer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.findOneBy({ id: Number(id) });
      if (usuario) {
        respuestaExito<Usuarios>(res, 200, '', usuario);
      } else {
        respuestaError(res, 404, "Usuario no encontrado");
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async modificar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Usuarios.update(Number(id), req.body);
      respuestaExito(res, 200, 'Usuario actualizado exitosamente.');
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Usuarios.delete(Number(id));
      respuestaExito(res, 200, 'Usuario eliminado exitosamente.');
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const usuarios = await Usuarios.find();
      respuestaExito<Usuarios[]>(res, 200, '', usuarios);
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async listarCategorias(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.findOne({
        where: { id: Number(id) },
        relations: ['categorias'],
      });
      if (usuario) {
        respuestaExito(res, 200, '', usuario.categorias);
      } else {
        respuestaError(res, 404, "Usuario no encontrado");
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }
}

export default new UsuariosController();