// services/reservations.js
const Reservation = require('../models/reservation');

/**
 * Crée une nouvelle réservation.
 * @async
 * @param {Object} input - Données de la réservation
 * @param {number} input.catwayNumber - Numéro du catway
 * @param {string} input.clientName - Nom du client
 * @param {string} input.boatName - Nom du bateau
 * @param {Date|string} input.startDate - Date de début
 * @param {Date|string} input.endDate - Date de fin
 * @throws {Error} ValidationError - Si les dates sont invalides
 * @throws {Error} 409 - Si un chevauchement est détecté
 * @returns {Promise<Object>} La réservation créée
 */
async function createReservation(input) {
  return await Reservation.create(input);
}

/**
 * Récupère une réservation par ID.
 * @async
 * @param {string} id - ID MongoDB de la réservation
 * @returns {Promise<Object|null>} La réservation ou null
 */
async function getReservationById(id) {
  return await Reservation.findById(id);
}

/**
 * Liste toutes les réservations (triées par date de début).
 * @async
 * @param {Object} [filter={}] - Filtre optionnel
 * @returns {Promise<Object[]>} Liste des réservations
 */
async function listReservations(filter = {}) {
  return await Reservation.find(filter).sort({ startDate: 1 });
}

/**
 * Met à jour une réservation.
 * @async
 * @param {string} id - ID MongoDB de la réservation
 * @param {Object} updates - Champs à mettre à jour
 * @throws {Error} ValidationError - Si les données sont invalides
 * @returns {Promise<Object|null>} La réservation mise à jour ou null
 */
async function updateReservation(id, updates) {
  return await Reservation.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

/**
 * Supprime une réservation.
 * @async
 * @param {string} id - ID MongoDB de la réservation
 * @returns {Promise<Object|null>} La réservation supprimée ou null
 */
async function deleteReservation(id) {
  return await Reservation.findByIdAndDelete(id);
}

module.exports = {
  createReservation,
  getReservationById,
  listReservations,
  updateReservation,
  deleteReservation,
};