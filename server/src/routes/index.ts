import { Router } from 'express';
import UsuariosRoutes from './usuarios.routes';
import CategoriasRoutes from './categorias.routes';
import TransaccionesRoutes from './transacciones.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('API funcionando correctamente.');
});

router.use('/usuarios', UsuariosRoutes);
router.use('/categorias', CategoriasRoutes);
router.use('/transacciones', TransaccionesRoutes);

export default router;