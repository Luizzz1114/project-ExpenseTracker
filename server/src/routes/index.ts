import { Router } from "express";
import UsuariosRoutes from "./usuarios.routes";

const router = Router();

router.get('/', (req, res) => {
  res.send('API funcionando correctamente.');
});

router.use('/usuarios', UsuariosRoutes);

export default router;