const express = require('express');
const cors = require('cors'); // ✅ Importa primero
const { createServer } = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');

// Crear app y servidor
const app = express();
const httpServer = createServer(app);

// 🟢 CORS y JSON deben ir antes de rutas
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json()); // para leer el body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use(require('./routes'));

// Socket.IO
const realTimeServer = require('./realTimeServer');
realTimeServer(httpServer);

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Iniciar servidor
httpServer.listen(app.get('port'), () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${app.get('port')}`);
});
