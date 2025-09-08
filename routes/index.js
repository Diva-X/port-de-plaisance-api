var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');

router.get('/', async (req, res) => {
  res.status(200).json({
    name: process.env.APP_NAME || 'Port de Plaisance API',
    version: '1.0.0',
    status: 200,
    message: 'Bienvenue sur l’API !'
  });
});

// délégation des routes /users
router.use('/users', userRoute);

module.exports = router;