import express from 'express';
import CategoriasController from '../controllers/categorias.controller';
import { auntenticarToken } from '../middleware/auth';

const CategoriasRoutes = express.Router();

CategoriasRoutes.route('/')
  .get(auntenticarToken, CategoriasController.listar)
  .post(auntenticarToken, CategoriasController.crear);
CategoriasRoutes.route('/:id')
  .get(auntenticarToken, CategoriasController.leer)
  .put(auntenticarToken, CategoriasController.modificar)
  .delete(auntenticarToken, CategoriasController.eliminar);

export default CategoriasRoutes;