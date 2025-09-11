// services/reservations.js
const Reservation = require('../models/reservation');

/**
 * Crée une réservation.
 * @param {{catwayNumber:number, clientName:string, boatName:string, startDate:Date|string, endDate:Date|string}} input
 * @returns {Promise<import("../models/reservation")>} Réservation créée
 * @throws {Error} si validation Mongoose échoue ou si chevauchement détecté
 */
async function createReservation(input) {
  return await Reservation.create(input);
}

/**
 * Récupère une réservation par son identifiant.
 * @param {string} id
 * @returns {Promise<import("../models/reservation")|null>}
 */
async function getReservationById(id) {
  return await Reservation.findById(id);
}

/**
 * Liste toutes les réservations (filtrage optionnel).
 * @param {Object} [filter={}] - Ex: { catwayNumber: 3 }
 * @returns {Promise<import("../models/reservation")[]>}
 */
async function listReservations(filter = {}) {
  return await Reservation.find(filter).sort({ startDate: 1 });
}

/**
 * Met à jour une réservation.
 * @param {string} id
 * @param {{catwayNumber?:number, clientName?:string, boatName?:string, startDate?:Date|string, endDate?:Date|string}} updates
 * @returns {Promise<import("../models/reservation")|null>} Réservation mise à jour
 */
async function updateReservation(id, updates) {
  return await Reservation.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

/**
 * Supprime une réservation.
 * @param {string} id
 * @returns {Promise<import("../models/reservation")|null>}
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