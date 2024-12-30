import express from 'express';
import {
  crearSolicitudSoporte,
  cambiarEstadoSolicitud,
  verHistorialSolicitudes,
  filtrarSolicitudes,
  asignarSolicitud,
  obtenerSolicitudesAsignadas
} from '../controllers/ControladorSolicitudSoporte.js';

import { verificarToken } from '../middlewares/VerificarToken.js';
import { verificarAdministrador, verificarRoles } from '../middlewares/VerificarRol.js';



const router = express.Router();

router.post('/', verificarToken, crearSolicitudSoporte);


router.patch(
  '/:id/estado',
  verificarToken,
  verificarRoles(['Administrador', 'Personal TICs','Pasante']),
  cambiarEstadoSolicitud
);
router.get('/historial', verificarToken, verHistorialSolicitudes);
router.get('/filtrar', verificarToken,verificarAdministrador, filtrarSolicitudes);
router.post('/asignar', verificarToken,verificarAdministrador, asignarSolicitud);
router.get('/asignadas', 
  verificarToken,
  verificarRoles(['Administrador', 'Personal TICs','Pasante']), obtenerSolicitudesAsignadas);


export default router;
