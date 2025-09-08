var express = require('express');
var router = express.Router();

// GET /users
router.get('/', async (req, res) => {
  res.json({ data: [], message: 'Liste des utilisateurs (mock)' });
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  res.json({ data: { id: req.params.id }, message: 'Détail utilisateur (mock)' });
});

// POST /users
router.post('/', async (req, res) => {
  // req.body contiendra les champs envoyés
  res.status(201).json({ data: req.body, message: 'Utilisateur créé (mock)' });
});

// PUT /users/:id
router.put('/:id', async (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: 'Utilisateur mis à jour (mock)' });
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  res.status(204).send(); // pas de contenu
});

module.exports = router;