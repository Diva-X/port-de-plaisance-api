const Reservation = require('../models/reservation');

/**
 * Construit un filtre pour détecter un chevauchement de réservation
 * sur un même catway.
 */
function overlapFilter({ catwayNumber, startDate, endDate }, excludeId = null) {
  const f = {
    catwayNumber,
    // Une réservation existante commence avant la fin
    startDate: { $lt: new Date(endDate) },
    // … et finit après le début → chevauchement
    endDate: { $gt: new Date(startDate) }
  };
  if (excludeId) f._id = { $ne: excludeId }; // exclure la réservation en cours de modif
  return f;
}

/**
 * Vérifie qu’aucune réservation ne chevauche
 * le créneau demandé sur le catway.
 */
async function ensureNoOverlap(input, excludeId = null) {
  const n = await Reservation.countDocuments(overlapFilter(input, excludeId));
  if (n > 0) {
    const err = new Error('RESERVATION_CONFLICT');
    err.status = 409; // HTTP 409 Conflict
    throw err;
  }
}

/**
 * Crée une réservation (avec vérification de chevauchement).
 */
async function createReservation(input) {
  await ensureNoOverlap(input);
  return await Reservation.create(input);
}

/**
 * Récupère une réservation par son id.
 */
async function getReservationById(id) {
  return await Reservation.findById(id);
}

/**
 * Liste toutes les réservations.
 */
async function listReservations(filter = {}) {
  return await Reservation.find(filter).sort({ startDate: 1 });
}

/**
 * Met à jour une réservation (en vérifiant le chevauchement).
 */
async function updateReservation(id, updates) {
  const current = await Reservation.findById(id);
  if (!current) return null;

  // Fusion des anciennes et nouvelles valeurs pour vérifier la cohérence
  const next = {
    catwayNumber: updates.catwayNumber ?? current.catwayNumber,
    clientName: updates.clientName ?? current.clientName,
    boatName: updates.boatName ?? current.boatName,
    startDate: updates.startDate ?? current.startDate,
    endDate: updates.endDate ?? current.endDate
  };

  await ensureNoOverlap(next, id);

  return await Reservation.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

/**
 * Supprime une réservation.
 */
async function deleteReservation(id) {
  return await Reservation.findByIdAndDelete(id);
}

module.exports = {
  createReservation,
  getReservationById,
  listReservations,
  updateReservation,
  deleteReservation
};