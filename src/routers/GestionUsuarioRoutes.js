import express from 'express';
import { crearUsuarios, eliminarUsuario } from '../controllers/ControladorGestionUsuario.js';
import { verificarToken } from '../middlewares/VerificarToken.js';
import { verificarAdministrador } from '../middlewares/VerificarRol.js';



const router = express.Router();

router.use(verificarToken, verificarAdministrador);

router.post('/crear', verificarToken, crearUsuarios);
router.delete('/eliminar/:id', eliminarUsuario);

export default router;
