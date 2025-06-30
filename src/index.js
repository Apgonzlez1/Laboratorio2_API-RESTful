const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');

let messages = []; // 🧠 Almacenamiento en memoria

const app = express();
const httpServer = createServer(app);

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Rutas API
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const newMessage = {
    _id: Date.now().toString(), // Importante: usar _id para compatibilidad con Angular
    text: req.body.text
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.put('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const index = messages.findIndex(msg => msg._id === id || msg.id === id);

  if (index !== -1) {
    messages[index].text = text;
    res.status(200).json({ message: 'Mensaje actualizado' });
  } else {
    res.status(404).json({ error: 'Mensaje no encontrado' });
  }
});

app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const index = messages.findIndex(msg => msg._id === id || msg.id === id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(200).json({ message: 'Mensaje eliminado' });
  } else {
    res.status(404).json({ error: 'Mensaje no encontrado' });
  }
});

// ✅ Ruta raíz para evitar error 404 en "/"
app.get('/', (req, res) => {
  res.send('✅ API de Chat funcionando correctamente');
});

// Socket.IO (opcional, si usas tiempo real)
try {
  const realTimeServer = require('./realTimeServer');
  realTimeServer(httpServer);
} catch (e) {
  console.log('ℹ️ Socket.IO desactivado (archivo realTimeServer.js no encontrado)');
}

// Configuración servidor
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

httpServer.listen(app.get('port'), () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${app.get('port')}`);
});
