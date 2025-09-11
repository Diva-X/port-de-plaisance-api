// services/users.js
const bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * Crée un nouvel utilisateur.
 * @async
 * @param {Object} input - Données de l’utilisateur
 * @param {string} input.email - Email unique de l’utilisateur
 * @param {string} input.password - Mot de passe en clair (sera hashé par le modèle)
 * @param {string} input.name - Nom complet
 * @throws {Error} EMAIL_EXISTS - Si l’email est déjà utilisé
 * @returns {Promise<Object>} L’utilisateur créé
 */
async function createUser({ email, password, name }) {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('EMAIL_EXISTS');
  return await User.create({ email, password, name });
}

/**
 * Récupère un utilisateur par son ID (sans le mot de passe).
 * @async
 * @param {string} id - ID MongoDB de l’utilisateur
 * @returns {Promise<Object|null>} L’utilisateur trouvé ou null
 */
async function getUserById(id) {
  return await User.findById(id).select('-password');
}

/**
 * Met à jour un utilisateur existant.
 * @async
 * @param {string} id - ID MongoDB de l’utilisateur
 * @param {Object} updates - Champs à mettre à jour
 * @throws {Error} NOT_FOUND - Si l’utilisateur n’existe pas
 * @returns {Promise<Object>} L’utilisateur mis à jour
 */
async function updateUser(id, updates) {
  const user = await User.findById(id);
  if (!user) throw new Error('NOT_FOUND');
  Object.assign(user, updates);
  await user.save();
  return user;
}

/**
 * Supprime un utilisateur.
 * @async
 * @param {string} id - ID MongoDB de l’utilisateur
 * @returns {Promise<Object|null>} L’utilisateur supprimé ou null
 */
async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

/**
 * Authentifie un utilisateur avec email + mot de passe.
 * @async
 * @param {string} email - Email de connexion
 * @param {string} password - Mot de passe en clair
 * @throws {Error} INVALID_CREDENTIALS - Si l’email ou le mot de passe est invalide
 * @returns {Promise<Object>} L’utilisateur authentifié
 */
async function authenticateUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('INVALID_CREDENTIALS');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('INVALID_CREDENTIALS');
  return user;
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser
};