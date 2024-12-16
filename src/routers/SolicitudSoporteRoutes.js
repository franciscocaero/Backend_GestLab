import express from 'express';
import {
  crearSolicitudSoporte,
  cambiarEstadoSolicitud,
  verHistorialSolicitudes,
  filtrarSolicitudes,
  consultaTemporal
} from '../controllers/ControladorSolicitudSoporte.js';
import { body,validationResult } from 'express-validator';
import { verificarToken } from '../middlewares/VerificarToken.js';
import { verificarAdministrador, verificarRoles } from '../middlewares/VerificarRol.js';



const router = express.Router();

router.post('/', verificarToken, crearSolicitudSoporte);


router.patch(
  '/:id/estado',
  verificarToken,
  verificarRoles(['Administrador', 'Personal TICs']),
  cambiarEstadoSolicitud
);
router.get('/historial', verificarToken, verHistorialSolicitudes);
router.get('/filtrar', verificarToken,verificarAdministrador, filtrarSolicitudes);
router.get('/consulta', verificarToken,verificarAdministrador, consultaTemporal);


export default router;
