import mongoose from 'mongoose';

const solicitudSoporteSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Encargada', 'Atendida', 'Completada'],
    default: 'Pendiente',
  },
  laboratorio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laboratorio',
    required: true,
  },
  equipo: {
    type: Number,
    required: true,
  },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
}, {
  timestamps: true,
});


solicitudSoporteSchema.pre('save', async function (next) {
  const Laboratorio = mongoose.model('Laboratorio');
  const laboratorio = await Laboratorio.findById(this.laboratorio);

  if (this.equipo > laboratorio.numComputadoras) {
    const error = new Error(`El equipo seleccionado (${this.equipo}) excede el número total de computadoras (${laboratorio.numComputadoras}) del laboratorio.`);
    return next(error);
  }

  next();
});

const SolicitudSoporte = mongoose.model('SolicitudSoporte', solicitudSoporteSchema);
export default SolicitudSoporte;
