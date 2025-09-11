// controllers/reservationsController.js
const service = require('../services/reservations');

/**
 * Rend la liste des réservations dans une vue EJS.
 * @route GET /reservations/view
 * @param {express.Request} req - Requête HTTP
 * @param {express.Response} res - Retourne une page HTML générée
 * @param {express.NextFunction} next - Middleware suivant en cas d’erreur
 * @returns {Promise<void>}
 */
async function viewAll(req, res, next) {
  try {
    const data = await service.listReservations();
    res.render('reservations', { title: 'Réservations', reservations: data });
  } catch (e) { next(e); }
}

/**
 * Liste toutes les réservations (format JSON).
 * @route GET /reservations
 * @param {express.Request} req - Requête HTTP
 * @param {express.Response} res - Retourne un tableau de réservations
 * @param {express.NextFunction} next - Middleware suivant en cas d’erreur
 * @returns {Promise<void>}
 */
async function list(req, res, next) {
  try {
    const reservations = await service.listReservations();
    res.json(reservations);
  } catch (e) { next(e); }
}

/**
 * Récupère une réservation par ID.
 * @route GET /reservations/:id
 * @param {express.Request} req - Contient l’ID dans req.params.id
 * @param {express.Response} res - Retourne une réservation
 * @param {express.NextFunction} next - Middleware suivant en cas d’erreur
 * @returns {Promise<void>}
 */
async function getById(req, res, next) {
  try {
    const r = await service.getReservationById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json(r);
  } catch (e) { next(e); }
}

/**
 * Crée une réservation.
 * @route POST /reservations
 * @param {express.Request} req - Body: { catwayNumber, clientName, boatName, startDate, endDate }
 * @param {express.Response} res - Retourne { id }
 * @param {express.NextFunction} next - Middleware suivant en cas d’erreur
 * @returns {Promise<void>}
 */
async function create(req, res, next) {
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
}

/**
 * Met à jour une réservation.
 * @route PATCH /reservations/:id
 * @param {express.Request} req - Contient l’ID dans req.params.id et les champs à modifier dans req.body
 * @param {express.Response} res - Retourne { message }
 * @param {express.NextFunction} next - Middleware suivant en cas d’erreur
 * @returns {Promise<void>}
 */
async function update(req, res, next) {
  try {
    const r = await service.updateReservation(req.params.id, req.body);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json({ message: 'Réservation mise à jour' });
  } catch (e) {
    if (e.status === 409) return res.status(409).json({ error: 'chevauchement détecté' });
    next(e);
  }
}

/**
 * Supprime une réservation.
 * @route DELETE /reservations/:id
 * @param {express.Request} req - Contient l’ID dans req.params.id
 * @param {express.Response} res - Retourne 204 No Content
 * @param {express.NextFunction} next - Middleware suivant en cas d’erreur
 * @returns {Promise<void>}
 */
async function remove(req, res, next) {
  try {
    const r = await service.deleteReservation(req.params.id);
    if (!r) return res.status(404).json({ error: 'Réservation introuvable' });
    res.status(204).send();
  } catch (e) { next(e); }
}

module.exports = { viewAll, list, getById, create, update, remove };