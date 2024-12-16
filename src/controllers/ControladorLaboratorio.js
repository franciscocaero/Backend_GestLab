import Laboratorio from '../models/Laboratorio.js';

export const crearLaboratorio = async (req, res) => {
  const { codigo, descripcion, numeroComputadoras, numeroProyectores } = req.body;

  try {
    const nuevoLaboratorio = new Laboratorio({
      codigo,
      descripcion,
      numeroComputadoras,
      numeroProyectores,
    });

    await nuevoLaboratorio.save();
    res.status(201).json({ message: 'Laboratorio creado exitosamente', laboratorio: nuevoLaboratorio });
  } catch (error) {
    console.error('Error al crear laboratorio:', error);
    res.status(500).json({ message: 'Error al crear laboratorio' });
  }
};

export const listarLaboratorios = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.find();
    res.json(laboratorios);
  } catch (error) {
    console.error('Error al listar laboratorios:', error);
    res.status(500).json({ message: 'Error al listar laboratorios' });
  }
};

export const actualizarLaboratorio = async (req, res) => {
  const { id } = req.params;
  const { codigo, descripcion, numeroComputadoras, numeroProyectores } = req.body;

  try {
    const laboratorio = await Laboratorio.findByIdAndUpdate(
      id,
      { codigo, descripcion, numeroComputadoras, numeroProyectores },
      { new: true, runValidators: true }
    );

    if (!laboratorio) {
      return res.status(404).json({ message: 'Laboratorio no encontrado' });
    }

    res.json({ message: 'Laboratorio actualizado exitosamente', laboratorio });
  } catch (error) {
    console.error('Error al actualizar laboratorio:', error);
    res.status(500).json({ message: 'Error al actualizar laboratorio' });
  }
};

export const eliminarLaboratorio = async (req, res) => {
  const { id } = req.params;

  try {
    const laboratorio = await Laboratorio.findByIdAndDelete(id);

    if (!laboratorio) {
      return res.status(404).json({ message: 'Laboratorio no encontrado' });
    }

    res.json({ message: 'Laboratorio eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar laboratorio:', error);
    res.status(500).json({ message: 'Error al eliminar laboratorio' });
  }
};
