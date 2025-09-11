// controllers/usersController.js
const jwt = require('jsonwebtoken');
const userService = require('../services/users');

async function createUser(req, res, next) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email et password sont requis' });
    const user = await userService.createUser({ email, password, name });
    res.status(201).json({ message: 'Utilisateur créé', id: user._id });
  } catch (e) {
    if (e.message === 'EMAIL_EXISTS') return res.status(409).json({ error: 'email déjà utilisé' });
    next(e);
  }
}

async function authenticateUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email et password sont requis' });
    const user = await userService.authenticateUser(email, password);
    const token = jwt.sign({}, process.env.JWT_SECRET, { subject: user._id.toString(), expiresIn: '7d' });
    res.cookie('jwt', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ message: 'Authentifié', userId: user._id });
  } catch (e) {
    if (e.message === 'INVALID_CREDENTIALS') return res.status(401).json({ error: 'identifiants invalides' });
    next(e);
  }
}

async function getUserById(req, res, next) {
  try {
    const u = await userService.getUserById(req.params.id);
    if (!u) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json(u);
  } catch (e) { next(e); }
}

async function updateUser(req, res, next) {
  try {
    await userService.updateUser(req.params.id, req.body);
    res.json({ message: 'Utilisateur mis à jour' });
  } catch (e) {
    if (e.message === 'NOT_FOUND') return res.status(404).json({ error: 'Utilisateur introuvable' });
    next(e);
  }
}

async function deleteUser(req, res, next) {
  try {
    const u = await userService.deleteUser(req.params.id);
    if (!u) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.status(204).send();
  } catch (e) { next(e); }
}

module.exports = {
  createUser,
  authenticateUser,
  getUserById,
  updateUser,
  deleteUser
};