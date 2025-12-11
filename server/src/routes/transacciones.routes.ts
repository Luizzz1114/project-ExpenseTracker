import express from 'express';
import TransaccionesController from '../controllers/transacciones.controller';

const TransaccionesRoutes = express.Router();

TransaccionesRoutes.route('/')
  .get(TransaccionesController.listar)
  .post(TransaccionesController.crear);
TransaccionesRoutes.route('/:id')
  .get(TransaccionesController.leer)
  .put(TransaccionesController.modificar)
  .delete(TransaccionesController.eliminar);

export default TransaccionesRoutes;