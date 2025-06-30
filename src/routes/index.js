const express = require("express");
const path = require("path");
const router = express.Router();

// Ruta a vistas HTML
const views = path.join(__dirname, "../views");

// Middleware para proteger ruta raíz
const isLoggedIn = require("../middlewares/isLoggedIn");

// ✅ Rutas de la API
router.use('/api/messages', require('./messages'));

// ✅ Ruta principal protegida
router.get("/", isLoggedIn, (req, res) => {
  res.sendFile(path.join(views, "index.html"));
});

// ✅ Página de registro (no protegida)
router.get("/register", (req, res) => {
  res.sendFile(path.join(views, "register.html"));
});

module.exports = router;
