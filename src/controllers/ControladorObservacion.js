import Observacion from '../models/Observacion.js';

export const crearObservacion = async (req, res) => {
  const { solicitudId, explicacion } = req.body;

  if (!req.usuario || !req.usuario.id) {
    return res.status(403).json({ message: 'No estás autorizado para crear una observación.' });
  }

  try {

    const nuevaObservacion = new Observacion({
      solicitud: solicitudId,
      autor: req.usuario.id, 
      explicacion,
    });

    const observacionGuardada = await nuevaObservacion.save();
    res.status(201).json(observacionGuardada);
  } catch (error) {
    console.error('Error al crear observación:', error);
    res.status(500).json({ message: 'Error al crear la observación' });
  }
};

export const listarObservacionesPorSolicitud = async (req, res) => {
  try {
    const { solicitudId } = req.params;

    const observaciones = await Observacion.find({ solicitud: solicitudId })
      .populate('autor', 'nombre email') 
      .sort({ createdAt: -1 });

    res.json(observaciones);
  } catch (error) {
    console.error('Error al listar observaciones:', error);
    res.status(500).json({ message: 'Error al listar las observaciones' });
  }
};

export const eliminarObservacion = async (req, res) => {
  try {
    const { id } = req.params;

    const observacion = await Observacion.findById(id);

    if (!observacion) {
      return res.status(404).json({ message: 'Observación no encontrada' });
    }

    if (observacion.autor.toString() !== req.usuario._id && req.usuario.rol !== 'Administrador') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta observación' });
    }

    await observacion.deleteOne();
    res.json({ message: 'Observación eliminada' });
  } catch (error) {
    console.error('Error al eliminar observación:', error);
    res.status(500).json({ message: 'Error al eliminar la observación' });
  }
};
