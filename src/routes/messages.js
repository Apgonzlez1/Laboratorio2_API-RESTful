const express = require('express');
const router = express.Router();

let messages = []; // En memoria, sin base de datos

// GET /api/messages
router.get('/', (req, res) => {
  res.json(messages);
});

// POST /api/messages
router.post('/', (req, res) => {
  const message = {
    _id: Date.now().toString(),
    text: req.body.text,
  };
  messages.push(message);
  res.status(201).json(message);
});

// DELETE /api/messages/:id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = messages.findIndex((msg) => msg._id === id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Mensaje no encontrado' });
  }
});

module.exports = router;
