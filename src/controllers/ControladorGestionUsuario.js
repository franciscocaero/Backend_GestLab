import Usuario from '../models/Usuario.js';

const validarPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};
export const crearOEditarUsuario = async (req, res) => {
  const { email, nombre, apellido, password, rol } = req.body;
  if (!email || !nombre || !apellido || !rol) return res.status(400).json({ message: 'Los campos email, nombre, apellido y rol son obligatorios.' });
  if (!['Administrador', 'PersonalTICs', 'Docente', 'AyudanteServicios', 'Pasante'].includes(rol)) return res.status(400).json({ message: 'El rol proporcionado no es válido.' });

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      usuarioExistente.nombre = nombre;
      usuarioExistente.apellido = apellido;
      usuarioExistente.rol = rol;
      if (password) {
        if (!validarPassword(password)) return res.status(400).json({ message: 'La contraseña no cumple con los requisitos' });
        usuarioExistente.password = password;
      }
      await usuarioExistente.save();
      return res.status(200).json({ message: 'Usuario actualizado exitosamente.', usuario: { email: usuarioExistente.email, nombre: usuarioExistente.nombre, apellido: usuarioExistente.apellido, rol: usuarioExistente.rol } });
    }

    if (!password) return res.status(400).json({ message: 'El campo password es obligatorio para nuevos usuarios.' });
    if (!validarPassword(password)) return res.status(400).json({ message: 'La contraseña no cumple con los requisitos' });
    
    const nuevoUsuario = new Usuario({ email, nombre, apellido, password, rol });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario creado exitosamente.', usuario: { email: nuevoUsuario.email, nombre: nuevoUsuario.nombre, apellido: nuevoUsuario.apellido, rol: nuevoUsuario.rol } });
  } catch (error) {
    console.error('Error al crear o editar usuario:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud.', error: error.message });
  }
};


export const eliminarUsuario = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      message: 'El campo email es obligatorio.' 
    });
  }

  try {
    const usuario = await Usuario.findOneAndDelete({ email });

    if (!usuario) {
      return res.status(404).json({ 
        message: 'Usuario no encontrado.' 
      });
    }

    res.json({ 
      message: 'Usuario eliminado exitosamente.' 
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ 
      message: 'Error al eliminar usuario.', 
      error: error.message 
    });
  }
};

