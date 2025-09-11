// controllers/reservationsController.js
const reservationService = require('../services/reservations');

/**
 * GET /reservations
 * Liste toutes les réservations
 */
async function list(req, res, next) {
  try {
    const reservations = await reservationService.listReservations();
    res.json(reservations);
  } catch (e) { next(e); }
}

/**
 * GET /reservations/:id
 * Récupère une réservation par ID
 */
async function getById(req, res, next) {
  try {
    const r = await reservationService.getReservationById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json(r);
  } catch (e) { next(e); }
}

/**
 * POST /reservations
 * Crée une réservation
 */
async function create(req, res, next) {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
      return res.status(400).json({ error: 'champs requis manquants' });
    }
    const r = await reservationService.createReservation({ catwayNumber, clientName, boatName, startDate, endDate });
    res.status(201).json({ id: r._id });
  } catch (e) {
    if (e.status === 409) return res.status(409).json({ error: 'chevauchement détecté' });
    next(e);
  }
}

/**
 * PATCH /reservations/:id
 * Met à jour une réservation
 */
async function update(req, res, next) {
  try {
    const r = await reservationService.updateReservation(req.params.id, req.body);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json({ message: 'Réservation mise à jour' });
  } catch (e) {
    if (e.status === 409) return res.status(409).json({ error: 'chevauchement détecté' });
    next(e);
  }
}

/**
 * DELETE /reservations/:id
 * Supprime une réservation
 */
async function remove(req, res, next) {
  try {
    const r = await reservationService.deleteReservation(req.params.id);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.status(204).send();
  } catch (e) { next(e); }
}

module.exports = { list, getById, create, update, remove };