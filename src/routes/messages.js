const express = require('express');
const router = express.Router();

let messages = []; // almacenamiento temporal

// GET
router.get('/', (req, res) => {
  res.json(messages);
});

// POST
// POST /api/messages
router.post('/', (req, res) => {
  const newMessage = {
    _id: Date.now().toString(), // 👈 _id con string
    text: req.body.text
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// PUT
// PUT /api/messages/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  
  const index = messages.findIndex(msg => msg._id === id); // usa _id
  if (index !== -1) {
    messages[index].text = text;
    return res.status(200).json({ message: 'Mensaje actualizado' });
  }
  res.status(404).json({ error: 'Mensaje no encontrado' });
});


// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = messages.findIndex(msg => msg._id === id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Mensaje no encontrado' });
  }
});

module.exports = router;
