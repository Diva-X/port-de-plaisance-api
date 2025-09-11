// routes/users.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.put('/add', controller.createUser);
router.get('/:id', controller.getUserById);
router.patch('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);
router.post('/authenticate', controller.authenticateUser);

module.exports = router;