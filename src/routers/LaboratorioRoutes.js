import express from 'express';
import {
  crearLaboratorio,
  listarLaboratorios,
  actualizarLaboratorio,
  eliminarLaboratorio,
} from '../controllers/ControladorLaboratorio.js';
import { verificarAdministrador } from '../middlewares/VerificarRol.js';
import { verificarToken } from '../middlewares/VerificarToken.js';

const router = express.Router();

router.use(verificarToken, verificarAdministrador);

router.post('/', crearLaboratorio);
router.get('/', listarLaboratorios);
router.put('/:id', actualizarLaboratorio);
router.delete('/:id', eliminarLaboratorio);

export default router;

