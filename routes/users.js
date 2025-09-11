// routes/users.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const requireJwt = require('../middlewares/authJwt');

// Public
router.put('/add', controller.createUser);
router.post('/authenticate', controller.authenticateUser);

// Protégées (lecture/modif/suppression)
router.get('/:id', requireJwt, controller.getUserById);
router.patch('/:id', requireJwt, controller.updateUser);
router.delete('/:id', requireJwt, controller.deleteUser);

module.exports = router;