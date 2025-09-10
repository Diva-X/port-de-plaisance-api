var express = require('express');
var router = express.Router();
const User = require('../models/user');

// Création d’un user
// PUT /users/add  (selon le cours)
// Body: email, password, name
router.put('/add', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email et password sont requis' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'email déjà utilisé' });
    }

    const user = await User.create({ email, password, name });
    res.status(201).json({ message: 'Utilisateur créé', id: user._id });
  } catch (e) {
    next(e);
  }
});

// Lire un user par ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // ne pas renvoyer le hash
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// Mise à jour d’un user
// PATCH /users/:id
router.patch('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

    if (req.body.name) user.name = req.body.name;
    if (req.body.password) user.password = req.body.password; // sera re-hashé par pre('save')

    await user.save();
    res.json({ message: 'Utilisateur mis à jour' });
  } catch (e) {
    next(e);
  }
});

// Suppression d’un user
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;