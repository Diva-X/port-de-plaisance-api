// routes/reservations.js
const express = require('express');
const router = express.Router();
const service = require('../services/reservations');

/** GET /reservations — liste */
router.get('/', async (req, res, next) => {
  try {
    const data = await service.listReservations();
    res.json(data);
  } catch (e) { next(e); }
});

/** GET /reservations/:id — détail */
router.get('/:id', async (req, res, next) => {
  try {
    const r = await service.getReservationById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json(r);
  } catch (e) { next(e); }
});

/** POST /reservations — création */
router.post('/', async (req, res, next) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
      return res.status(400).json({ error: 'champs requis manquants' });
    }
    const r = await service.createReservation({ catwayNumber, clientName, boatName, startDate, endDate });
    res.status(201).json({ id: r._id });
  } catch (e) { next(e); }
});

/** PATCH /reservations/:id — mise à jour partielle */
router.patch('/:id', async (req, res, next) => {
  try {
    const r = await service.updateReservation(req.params.id, req.body);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json({ message: 'Réservation mise à jour' });
  } catch (e) { next(e); }
});

/** DELETE /reservations/:id — suppression */
router.delete('/:id', async (req, res, next) => {
  try {
    const r = await service.deleteReservation(req.params.id);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.status(204).send();
  } catch (e) { next(e); }
});

module.exports = router;