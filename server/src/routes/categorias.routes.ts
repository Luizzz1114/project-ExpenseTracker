import express from "express";
import CategoriasController from "../controllers/categorias.controller";

const CategoriasRoutes = express.Router();

CategoriasRoutes.route('/')
  .get(CategoriasController.listar)
  .post(CategoriasController.crear);
CategoriasRoutes.route('/:id')
  .get(CategoriasController.leer)
  .put(CategoriasController.modificar)
  .delete(CategoriasController.eliminar);

export default CategoriasRoutes;