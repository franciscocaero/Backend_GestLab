import Nota from '../models/Nota.js';

export const crearNota = async (req, res) => {
  const { solicitudId, mensaje } = req.body;

  if (!req.usuario || !req.usuario.id) {
    return res.status(403).json({ message: 'No estás autorizado para crear una nota.' });
  }

  try {

    const nuevaNota = new Nota({
      solicitud: solicitudId,
      mensaje,
      autor: req.usuario.id, 
    });

    const notaGuardada = await nuevaNota.save(); 
    res.status(201).json(notaGuardada); 
  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
};

export const listarNotasPorSolicitud = async (req, res) => {
  try {
    const { solicitudId } = req.params;

    const notas = await Nota.find({ solicitud: solicitudId })
      .populate('autor', 'nombre email') 
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

    if (nota.autor.toString() !== req.usuario.id && req.usuario.rol !== 'Administrador') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta nota' });
    }

    await nota.deleteOne(); 
    res.json({ message: 'Nota eliminada' }); 
  } catch (error) {
    console.error('Error al eliminar nota:', error);
    res.status(500).json({ message: 'Error al eliminar la nota' });
  }
};