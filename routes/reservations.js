// routes/reservations.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reservationsController');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;