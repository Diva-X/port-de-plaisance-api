// controllers/usersController.js
const userService = require('../services/users');

/**
 * Crée un utilisateur
 */
async function createUser(req, res, next) {
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
}

/**
 * Récupère un utilisateur par son ID
 */
async function getUserById(req, res, next) {
  try {
    const u = await userService.getUserById(req.params.id);
    if (!u) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json(u);
  } catch (e) {
    next(e);
  }
}

/**
 * Met à jour un utilisateur
 */
async function updateUser(req, res, next) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ message: 'Utilisateur mis à jour' });
  } catch (e) {
    if (e.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
    next(e);
  }
}

/**
 * Supprime un utilisateur
 */
async function deleteUser(req, res, next) {
  try {
    const u = await userService.deleteUser(req.params.id);
    if (!u) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

/**
 * Authentifie un utilisateur
 */
async function authenticateUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email et password sont requis' });
    }
    const user = await userService.authenticateUser(email, password);
    req.session.userId = user._id.toString();
    res.json({ message: 'Authentifié', userId: user._id });
  } catch (e) {
    if (e.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'identifiants invalides' });
    }
    next(e);
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser
};