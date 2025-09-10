// routes/users.js
var express = require('express');
var router = express.Router();
const userService = require('../services/users');

/**
 * Authentification
 * POST /users/authenticate
 */
router.post('/authenticate', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email et password sont requis' });
    }

    const user = await userService.authenticateUser(email, password);
    req.session.userId = user._id.toString(); // persistance dans la session
    res.json({ message: 'Authentifié', userId: user._id });
  } catch (e) {
    if (e.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'identifiants invalides' });
    }
    next(e);
  }
});

/**
 * Création d’un user
 * PUT /users/add
 */
router.put('/add', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email et password sont requis' });
    }

    const user = await userService.createUser({ email, password, name });
    res.status(201).json({ message: 'Utilisateur créé', id: user._id });
  } catch (e) {
    if (e.message === 'EMAIL_EXISTS') {
      return res.status(409).json({ error: 'email déjà utilisé' });
    }
    next(e);
  }
});

/**
 * Lecture d’un user par id
 * GET /users/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const u = await userService.getUserById(req.params.id);
    if (!u) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json(u);
  } catch (e) {
    next(e);
  }
});

/**
 * Mise à jour partielle
 * PATCH /users/:id
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ message: 'Utilisateur mis à jour' });
  } catch (e) {
    if (e.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
    next(e);
  }
});

/**
 * Suppression
 * DELETE /users/:id
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const u = await userService.deleteUser(req.params.id);
    if (!u) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;