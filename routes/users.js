// routes/reservations.js
const express = require('express');
const router = express.Router();
const service = require('../services/reservations');

/**
 * @route GET /reservations
 * @description Liste toutes les réservations
 * @returns {200} Array<Reservation>
 */
router.get('/', async (req, res, next) => {
  try {
    const data = await service.listReservations();
    res.json(data);
  } catch (e) { next(e); }
});

/**
 * @route GET /reservations/:id
 * @description Récupère une réservation par son identifiant
 * @param {string} id
 * @returns {200} Reservation
 * @returns {404} Réservation introuvable
 */
router.get('/:id', async (req, res, next) => {
  try {
    const r = await service.getReservationById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json(r);
  } catch (e) { next(e); }
});

/**
 * @route POST /reservations
 * @description Crée une réservation
 * @body {number} catwayNumber
 * @body {string} clientName
 * @body {string} boatName
 * @body {string|Date} startDate
 * @body {string|Date} endDate
 * @returns {201} { id:string }
 * @returns {400} Validation Mongoose
 * @returns {409} Chevauchement détecté
 */
router.post('/', async (req, res, next) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
      return res.status(400).json({ error: 'champs requis manquants' });
    }
    const r = await service.createReservation({ catwayNumber, clientName, boatName, startDate, endDate });
    res.status(201).json({ id: r._id });
  } catch (e) {
    if (e.status === 409) return res.status(409).json({ error: 'chevauchement détecté' });
    next(e);
  }
});

/**
 * @route PATCH /reservations/:id
 * @description Met à jour partiellement une réservation
 * @param {string} id
 * @returns {200} { message:string }
 * @returns {404} Réservation introuvable
 * @returns {409} Chevauchement détecté
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const r = await service.updateReservation(req.params.id, req.body);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json({ message: 'Réservation mise à jour' });
  } catch (e) {
    if (e.status === 409) return res.status(409).json({ error: 'chevauchement détecté' });
    next(e);
  }
});

/**
 * @route DELETE /reservations/:id
 * @description Supprime une réservation
 * @param {string} id
 * @returns {204} No Content
 * @returns {404} Réservation introuvable
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const r = await service.deleteReservation(req.params.id);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.status(204).send();
  } catch (e) { next(e); }
});

module.exports = router;