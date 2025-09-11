// services/users.js
const bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * Crée un nouvel utilisateur.
 * @param {{email:string, password:string, name?:string}} input
 * @returns {Promise<import("../models/user")>} Utilisateur créé
 * @throws {Error} EMAIL_EXISTS si l'email est déjà utilisé
 */
async function createUser({ email, password, name }) {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('EMAIL_EXISTS');
  const user = await User.create({ email, password, name });
  return user;
}

/**
 * Retourne un utilisateur par son identifiant.
 * @param {string} id
 * @returns {Promise<import("../models/user")|null>}
 */
async function getUserById(id) {
  return await User.findById(id).select('-password');
}

/**
 * Met à jour partiellement un utilisateur.
 * @param {string} id
 * @param {{email?:string, password?:string, name?:string}} updates
 * @returns {Promise<import("../models/user")>} Utilisateur mis à jour
 * @throws {Error} NOT_FOUND si l'utilisateur n'existe pas
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
 * @param {string} id
 * @returns {Promise<import("../models/user")|null>}
 */
async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

/**
 * Authentifie un utilisateur (login).
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import("../models/user")>}
 * @throws {Error} INVALID_CREDENTIALS si email/mot de passe invalide
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