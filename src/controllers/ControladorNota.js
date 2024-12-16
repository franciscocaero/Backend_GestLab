import Nota from '../models/Nota.js';


export const crearNota = async (req, res) => {
  try {
    const { solicitudId, mensaje } = req.body;
    const { _id: autor } = req.usuario;

    const nuevaNota = await Nota.create({
      solicitud: solicitudId,
      mensaje,
      autor,
    });

    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
};

export const listarNotasPorSolicitud = async (req, res) => {
  try {
    const { solicitudId } = req.params;

    const notas = await Nota.find({ solicitud: solicitudId })
      .populate('autor', 'nombre email') // Información básica del autor
      .sort({ createdAt: -1 });

    res.json(notas);
  } catch (error) {
    console.error('Error al listar notas:', error);
    res.status(500).json({ message: 'Error al listar las notas' });
  }
};


export const eliminarNota = async (req, res) => {
  try {
    const { id } = req.params;

    const nota = await Nota.findById(id);

    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    if (req.usuario.rol !== 'Administrador') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta nota' });
    }

    await nota.deleteOne();
    res.json({ message: 'Nota eliminada' });
  } catch (error) {
    console.error('Error al eliminar nota:', error);
    res.status(500).json({ message: 'Error al eliminar la nota' });
  }
};
