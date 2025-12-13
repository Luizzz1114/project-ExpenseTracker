import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { respuestaExito, respuestaError } from "../utils/responses";
import { Usuarios } from "../models/usuarios.model";
import { generarToken } from "../utils/auth";

class UsuariosController {

  async crear(req: Request, res: Response) {
    try {
      const { contrasena } = req.body;
			const hashContrasena = await bcrypt.hash(contrasena, 10);
      const nuevoUsuario = await Usuarios.save(req.body = {
        ...req.body,
        contrasena: hashContrasena
      });
      if (nuevoUsuario) {
        respuestaExito<Usuarios>(res, 201, 'Usuario creado exitosamente.', nuevoUsuario);
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async leer(req: Request, res: Response) {
    try {
      const { id } = req.usuario;
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
      const { id } = req.usuario;
      const { contrasena } = req.body;
			const hashContrasena = await bcrypt.hash(contrasena, 10);
      const resultado = await Usuarios.update(Number(id), req.body = {
        ...req.body,
        contrasena: hashContrasena
      });
      if (resultado.affected === 0) {
        respuestaError(res, 404, 'Usuario no encontrado.');
      } else {
        respuestaExito(res, 200, 'Usuario actualizado exitosamente.');  
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

  async eliminar(req: Request, res: Response) {
    try {
      const { id } = req.usuario;
      const resultado = await Usuarios.delete(Number(id));
      if (resultado.affected === 0) {
        respuestaError(res, 404, 'Usuario no encontrado.');
      } else {
        respuestaExito(res, 200, 'Usuario eliminado exitosamente.'); 
      }
    } catch (error) {
      respuestaError(res, 500, 'Error interno del servidor.', error.message);
    }
  }

	async login(req: Request, res: Response) {
		try {
			const { correo, contrasena } = req.body;
			const usuario = await Usuarios.findOneBy({ correo: correo });
			if (!usuario) {
				return respuestaError(res, 401, 'Datos incorrectos.');
			}
			const usuarioValido = await bcrypt.compare(contrasena, usuario.contrasena);
			if (!usuarioValido) {
				return respuestaError(res, 401, 'Datos incorrectos.');
			}
			const token = generarToken(usuario.id, usuario.nombre, usuario.correo);
			const data = {
				nombre: usuario.nombre,
				correo: usuario.correo,
				token
			};
			respuestaExito(res, 200, 'Usuario autenticado.',  data);
		} catch (error){
			respuestaError(res, 500, 'Error al validar las credenciales.', error.message);
		}
	}
}

export default new UsuariosController();