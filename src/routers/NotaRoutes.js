import express from 'express';
import {
  crearNota,
  listarNotasPorSolicitud,
  eliminarNota,
} from '../controllers/ControladorNota.js';
import { verificarToken } from '../middlewares/VerificarToken.js';
import { verificarAdministrador } from '../middlewares/VerificarRol.js';

const router = express.Router();


router.post('/', verificarToken, verificarAdministrador, crearNota);
router.get('/:solicitudId', verificarToken, verificarAdministrador, listarNotasPorSolicitud);
router.delete('/:id', verificarToken, verificarAdministrador, eliminarNota);

export default router;
