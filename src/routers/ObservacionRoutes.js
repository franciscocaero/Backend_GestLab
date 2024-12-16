import express from 'express';
import {
  crearObservacion,
  listarObservacionesPorSolicitud,
  eliminarObservacion,
} from '../controllers/ControladorObservacion.js';
import { verificarToken } from '../middlewares/VerificarToken.js';
import { verificarRoles } from '../middlewares/VerificarRol.js';

const router = express.Router();

router.post('/', verificarToken,verificarRoles(['Administrador', 'Personal TICs','Pasante']), crearObservacion);
router.get('/:solicitudId', verificarToken,verificarRoles(['Administrador', 'Personal TICs','Pasante']), listarObservacionesPorSolicitud);
router.delete('/:id', verificarToken,verificarRoles(['Administrador', 'Personal TICs','Pasante']), eliminarObservacion);

export default router;
