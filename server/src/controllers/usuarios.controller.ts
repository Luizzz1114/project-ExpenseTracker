import { Request, Response } from "express";
import { respuestaExito, respuestaError } from "../helpers/responses";
import { Usuarios } from "../models/usuarios.models";

class UsuariosController {

  async crear(req: Request, res: Response) {
    try {
      const nuevoUsuario = await Usuarios.save(req.body);
      if (nuevoUsuario) {
        respuestaExito<Usuarios>(res, 201, 'Usuario creado exitosamente.', nuevoUsuario);
      } else {
        respuestaError(res, 400, 'No se pudo crear el usuario.');
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error);
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
      respuestaError(res, 500, 'Error interno del servidor.', error);
    }
  }

  async modificar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Usuarios.update(Number(id), req.body);
      respuestaExito<null>(res, 200, 'Usuario actualizado exitosamente.', null);
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error);
    }
  }

  async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Usuarios.delete(Number(id));
      respuestaExito<null>(res, 200, 'Usuario eliminado exitosamente.', null);
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error);
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const usuarios = await Usuarios.find();
      respuestaExito<Usuarios[]>(res, 200, '', usuarios);
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error);
    }
  }
}

export default new UsuariosController();