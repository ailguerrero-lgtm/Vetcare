const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { config } = require('./config/db.config');
const dbService = require('./services/db.service');

const app = express();
const PORT = config.port;

// Configuración de CORS para permitir peticiones desde los puertos locales del frontend Angular
const allowedOrigins = ['http://localhost:4200', 'http://localhost:4201'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares globales
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API (las importaremos y registraremos a continuación)
const authRoutes = require('./routes/auth.routes');
const mascotasRoutes = require('./routes/mascotas.routes');
const propietariosRoutes = require('./routes/propietarios.routes');
const vacunasCitasRoutes = require('./routes/vacunas-citas.routes');

app.use('/api/auth', authRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/propietarios', propietariosRoutes);
app.use('/api/vacunas-citas', vacunasCitasRoutes);

// Ruta de salud de la API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VetCare API está activa 🐾' });
});

app.get('/api/db/status', async (req, res) => {
  res.json(dbService.getStatus());
});

app.get('/api/db/test', async (req, res) => {
  const result = await dbService.testConnection();
  res.status(result.ok ? 200 : 503).json(result);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('❌ Error no controlado:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor VetCare corriendo en http://localhost:${PORT}`);
});
