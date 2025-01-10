import express from 'express';
import { crearOEditarUsuario, eliminarUsuario } from '../controllers/ControladorGestionUsuario.js';
import { verificarToken } from '../middlewares/VerificarToken.js';
import { verificarAdministrador } from '../middlewares/VerificarRol.js';

const router = express.Router();

router.use(verificarToken, verificarAdministrador);

router.post('/crear-o-editar', crearOEditarUsuario);

router.delete('/eliminar', eliminarUsuario);

export default router;

