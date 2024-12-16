import Usuario from '../models/Usuario.js';

export const crearUsuarios = async (req, res) => {
  const { usuarios } = req.body; 

  if (!Array.isArray(usuarios) || usuarios.length === 0) {
    return res.status(400).json({ message: 'Se debe proporcionar una lista de usuarios válida.' });
  }

  try {
    const resultados = [];
    for (const usuarioData of usuarios) {
      const { email, rol } = usuarioData;

      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
        resultados.push({
          email,
          status: 'existente',
          message: 'El usuario ya existe y no se modificará.',
        });
        continue; 
      }


      const nuevoUsuario = new Usuario(usuarioData);
      await nuevoUsuario.save();
      resultados.push({
        email,
        status: 'creado',
        message: 'Usuario creado exitosamente.',
      });
    }

    res.status(201).json({
      message: 'Proceso completado.',
      resultados,
    });
  } catch (error) {
    console.error('Error al crear usuarios:', error);
    res.status(500).json({ message: 'Error al crear usuarios.', error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await usuario.remove();
    res.json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario.', error: error.message });
  }
};
