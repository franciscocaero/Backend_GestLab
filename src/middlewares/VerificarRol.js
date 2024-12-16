export const verificarAdministrador = (req, res, next) => {
    const { rol } = req.usuario; 
  
    if (rol !== 'Administrador') {
      return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
    }
  
    next();
  };
  
  export const verificarRoles = (rolesPermitidos) => (req, res, next) => {
    try {
      const { rol } = req.usuario; 
  
      if (!rolesPermitidos.includes(rol)) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
  
      next();
    } catch (error) {
      console.error('Error en la verificación de roles:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  