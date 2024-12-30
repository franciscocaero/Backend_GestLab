import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import usuarioRoutes from './routers/UsuarioRoutes.js'
import laboratorioRoutes from './routers/LaboratorioRoutes.js';
import solicitudSoporteRoutes from './routers/SolicitudSoporteRoutes.js';
import ObservacionRoutes from './routers/ObservacionRoutes.js';
import notaRoutes from './routers/NotaRoutes.js';
import GestionUsuarioRoutes from './routers/GestionUsuarioRoutes.js';
import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
dotenv.config()


app.set('port',process.env.port || 3000)
app.use(cors())



app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));


app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/laboratorios', laboratorioRoutes);
app.use('/api/soporte', solicitudSoporteRoutes);
app.use('/api/observaciones', ObservacionRoutes);
app.use('/api/notas', notaRoutes);
app.use('/api/gestion', GestionUsuarioRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


export default  app