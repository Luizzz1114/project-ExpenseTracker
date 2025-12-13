import express from 'express';
import UsuariosController from '../controllers/usuarios.controller';
import { auntenticarToken } from '../middleware/auth';

const UsuariosRoutes = express.Router();

UsuariosRoutes.post('/registrar', UsuariosController.crear);
UsuariosRoutes.post('/login', UsuariosController.login);
UsuariosRoutes.get('/perfil', auntenticarToken, UsuariosController.leer);
UsuariosRoutes.route('/')
  .put(auntenticarToken, UsuariosController.modificar)
  .delete(auntenticarToken, UsuariosController.eliminar);

export default UsuariosRoutes;