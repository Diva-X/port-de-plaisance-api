// services/reservations.js
const Reservation = require('../models/reservation');

/**
 * Crée une réservation.
 * @param {Object} input
 * @param {number} input.catwayNumber
 * @param {string} input.clientName
 * @param {string} input.boatName
 * @param {Date|string} input.startDate
 * @param {Date|string} input.endDate
 * @returns {Promise<Object>} La réservation créée
 */
async function createReservation(input) {
  return await Reservation.create(input);
}

/**
 * Récupère une réservation par id.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function getReservationById(id) {
  return await Reservation.findById(id);
}

/**
 * Liste les réservations (filtrage simple possible).
 * @param {Object} [filter]
 * @returns {Promise<Object[]>}
 */
async function listReservations(filter = {}) {
  return await Reservation.find(filter).sort({ startDate: 1 });
}

/**
 * Met à jour une réservation.
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<Object|null>}
 */
async function updateReservation(id, updates) {
  return await Reservation.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

/**
 * Supprime une réservation.
 * @param {string} id
 * @returns {Promise<Object|null>}
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