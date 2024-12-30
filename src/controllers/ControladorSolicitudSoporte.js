import SolicitudSoporte from '../models/SolicitudSoporte.js';
import Laboratorio from '../models/Laboratorio.js';
import Usuario from '../models/Usuario.js';

export const crearSolicitudSoporte = async (req, res) => {
  const { titulo, descripcion, laboratorio, equipo } = req.body;

  try {
    const laboratorioExiste = await Laboratorio.findById(laboratorio);

    if (!laboratorioExiste) {
      return res.status(404).json({ message: 'Laboratorio no encontrado' });
    }

    const nuevaSolicitud = new SolicitudSoporte({
      titulo,
      descripcion,
      laboratorio,
      equipo,
      creadoPor: req.usuario.id,
    });

    const solicitudGuardada = await nuevaSolicitud.save();
    res.status(201).json(solicitudGuardada);
  } catch (error) {
    console.error('Error al crear la solicitud de soporte:', error);
    res.status(500).json({ message: 'Error al crear la solicitud de soporte' });
  }
};

export const cambiarEstadoSolicitud = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosPermitidos = ['Pendiente', 'Encargada', 'Atendida', 'Completada'];

  if (!estadosPermitidos.includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido' });
  }

  try {
    const solicitud = await SolicitudSoporte.findById(id);

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    solicitud.estado = estado;
    const solicitudActualizada = await solicitud.save();
    res.json(solicitudActualizada);
  } catch (error) {
    console.error('Error al cambiar el estado de la solicitud:', error);
    res.status(500).json({ message: 'Error al cambiar el estado de la solicitud' });
  }
};

export const verHistorialSolicitudes = async (req, res) => {
  try {
    const { id: userId, rol } = req.usuario;

    let solicitudes;

    if (['Administrador', 'PersonalTICs', 'Pasante'].includes(rol)) {
      solicitudes = await SolicitudSoporte.find()
        .populate('laboratorio', 'codigo descripcion')
        .populate('creadoPor', 'nombre email');
    } else {
      solicitudes = await SolicitudSoporte.find({ creadoPor: userId })
        .populate('laboratorio', 'codigo descripcion')
        .populate('creadoPor', 'nombre email');
    }

    res.json({
      message: 'Historial de solicitudes recuperado exitosamente.',
      solicitudes,
    });
  } catch (error) {
    console.error('Error al recuperar historial de solicitudes:', error);
    res.status(500).json({ message: 'Error al recuperar el historial.' });
  }
};

export const filtrarSolicitudes = async (req, res) => {
  const { codigoLaboratorio, nombreUsuario } = req.query;

  try {
    const query = {};

    if (codigoLaboratorio) {
      const laboratorio = await Laboratorio.findOne({ codigo: codigoLaboratorio });
      if (laboratorio) {
        query.laboratorio = laboratorio._id;
      } else {
        return res.status(404).json({ message: 'Laboratorio no encontrado con el código proporcionado.' });
      }
    }

    if (nombreUsuario) {
      const usuarios = await Usuario.find({ nombre: { $regex: nombreUsuario, $options: 'i' } });
      if (usuarios.length > 0) {
        const usuarioIds = usuarios.map(usuario => usuario._id.toString());
        query.creadoPor = { $in: usuarioIds };
      } else {
        return res.status(404).json({ message: 'No se encontraron usuarios con el nombre proporcionado.' });
      }
    }

    const solicitudes = await SolicitudSoporte.find(query)
      .populate('laboratorio', 'codigo descripcion')
      .populate('creadoPor', 'nombre email');

    if (solicitudes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron solicitudes con los filtros proporcionados.' });
    }

    res.json({
      message: 'Solicitudes filtradas exitosamente.',
      solicitudes,
    });
  } catch (error) {
    console.error('Error al filtrar solicitudes:', error);
    res.status(500).json({ message: 'Error al filtrar solicitudes.' });
  }
};

export const asignarSolicitud = async (req, res) => {
  try {
    if (req.usuario.rol !== 'Administrador') {
      return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
    }

    const { solicitudId, usuarioId } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const solicitud = await SolicitudSoporte.findByIdAndUpdate(
      solicitudId,
      { asignadoA: usuarioId },
      { new: true }
    );
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.status(200).json({ message: 'Solicitud asignada correctamente', solicitud });
  } catch (error) {
    console.error('Error al asignar la solicitud:', error);
    res.status(500).json({ error: 'Error al asignar la solicitud' });
  }
};

export const obtenerSolicitudesAsignadas = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const solicitudes = await SolicitudSoporte.find({ asignadoA: usuarioId })
      .populate('laboratorio', 'codigo descripcion');
    res.status(200).json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes asignadas:', error);
    res.status(500).json({ error: 'Error al obtener las solicitudes asignadas' });
  }
};
