import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import usuarioRoutes from './routers/UsuarioRoutes.js'
import laboratorioRoutes from './routers/LaboratorioRoutes.js';
import solicitudSoporteRoutes from './routers/SolicitudSoporteRoutes.js';
import ObservacionRoutes from './routers/ObservacionRoutes.js';
import notaRoutes from './routers/NotaRoutes.js';
import GestionUsuarioRoutes from './routers/GestionUsuarioRoutes.js';

const app = express()
dotenv.config()


app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())



app.get('/',(req,res)=>{
    res.send("Server on")
})
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/laboratorios', laboratorioRoutes);
app.use('/api/soporte', solicitudSoporteRoutes);
app.use('/api/observaciones', ObservacionRoutes);
app.use('/api/notas', notaRoutes);
app.use('/api/gestion', GestionUsuarioRoutes);

app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


export default  app