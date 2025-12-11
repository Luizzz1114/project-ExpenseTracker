import express from 'express';
import UsuariosController from '../controllers/usuarios.controller';

const UsuariosRoutes = express.Router();

UsuariosRoutes.route('/')
  .get(UsuariosController.listar)
  .post(UsuariosController.crear);
UsuariosRoutes.route('/:id')
  .get(UsuariosController.leer)
  .put(UsuariosController.modificar)
  .delete(UsuariosController.eliminar);

export default UsuariosRoutes;