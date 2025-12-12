import express from 'express';
import UsuariosController from '../controllers/usuarios.controller';
import { auntenticarToken } from '../middleware/auth';

const UsuariosRoutes = express.Router();

UsuariosRoutes.post('/registrar', UsuariosController.crear);
UsuariosRoutes.post('/login', UsuariosController.login);
UsuariosRoutes.route('/:id')
  .get(auntenticarToken, UsuariosController.leer)
  .put(auntenticarToken, UsuariosController.modificar)
  .delete(auntenticarToken, UsuariosController.eliminar);

UsuariosRoutes.get('/', UsuariosController.listar);

export default UsuariosRoutes;