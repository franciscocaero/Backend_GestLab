import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['Administrador', 'PersonalTICs', 'Docente', 'AyudanteServicios', 'Pasante'],
    required: true,
  },
}, {
  timestamps: true,
});

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

usuarioSchema.methods.compararPassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
