// services/users.js
const User = require('../models/user');

/**
 * Crée un nouvel utilisateur
 */
async function createUser({ email, password, name }) {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('EMAIL_EXISTS');
  const user = await User.create({ email, password, name });
  return user;
}

/**
 * Récupère un utilisateur par son ID
 */
async function getUserById(id) {
  return await User.findById(id).select('-password');
}

/**
 * Met à jour un utilisateur
 */
async function updateUser(id, updates) {
  const user = await User.findById(id);
  if (!user) throw new Error('NOT_FOUND');
  Object.assign(user, updates);
  await user.save();
  return user;
}

/**
 * Supprime un utilisateur
 */
async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};