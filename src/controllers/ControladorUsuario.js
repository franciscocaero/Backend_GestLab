import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import transporter from '../config/nodemailer.js'; 
import crypto from 'crypto';

const validarPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};

export const login = async (req, res) => {
  const { email, password } = req.body; 

  try {

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await usuario.compararPassword(password);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }


    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol, 
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


let verificationCodes = {}; 

export const solicitarCambioPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const verificationCode = crypto.randomBytes(3).toString('hex'); 
    verificationCodes[email] = verificationCode; 

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Código de verificación para cambio de contraseña',
      text: `Tu código de verificación es: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Código de verificación enviado a tu correo' });
  } catch (error) {
    console.error('Error al solicitar cambio de contraseña:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const cambiarPassword = async (req, res) => {
  const { email, verificationCode, nuevaContraseña, confirmarContraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    if (verificationCodes[email] !== verificationCode) return res.status(401).json({ message: 'Código de verificación incorrecto' });
    if (nuevaContraseña !== confirmarContraseña) return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    if (!validarPassword(nuevaContraseña)) return res.status(400).json({ message: 'La contraseña no cumple con los requisitos' });
    
    usuario.password = nuevaContraseña;
    await usuario.save();
    delete verificationCodes[email];
    res.json({ message: 'Contraseña actualizada exitosamente', email: usuario.email });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
