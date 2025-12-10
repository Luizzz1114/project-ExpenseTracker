import { Router } from "express";
import UsuariosRoutes from "./usuarios.routes";
import CategoriasRoutes from "./categorias.routes";

const router = Router();

router.get('/', (req, res) => {
  res.send('API funcionando correctamente.');
});

router.use('/usuarios', UsuariosRoutes);
router.use('/categorias', CategoriasRoutes);

export default router;