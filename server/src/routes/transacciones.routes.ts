import express from 'express';
import TransaccionesController from '../controllers/transacciones.controller';
import { auntenticarToken } from '../middleware/auth';

const TransaccionesRoutes = express.Router();

TransaccionesRoutes.route('/')
  .get(auntenticarToken, TransaccionesController.listar)
  .post(auntenticarToken, TransaccionesController.crear);
TransaccionesRoutes.route('/:id')
  .get(auntenticarToken, TransaccionesController.leer)
  .put(auntenticarToken, TransaccionesController.modificar)
  .delete(auntenticarToken, TransaccionesController.eliminar);

export default TransaccionesRoutes;