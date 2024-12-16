import mongoose from 'mongoose';

const notaSchema = new mongoose.Schema(
  {
    solicitud: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SolicitudSoporte', 
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
      trim: true,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario', 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Nota = mongoose.model('Nota', notaSchema);
export default Nota;
