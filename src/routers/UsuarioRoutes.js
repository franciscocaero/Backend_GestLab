import express from 'express';
import { login, solicitarCambioPassword, cambiarPassword } from '../controllers/ControladorUsuario.js';

const router = express.Router();




router.post('/login', login);
router.post('/solicitar-cambio-password', solicitarCambioPassword); 
router.post('/cambiar-password', cambiarPassword);

export default router;
