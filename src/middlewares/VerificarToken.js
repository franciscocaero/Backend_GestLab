import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.usuario = decoded;

    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
