const jwt = require('jsonwebtoken');
const userService = require('../services/users');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email et password sont requis' });
    const user = await userService.authenticateUser(email, password);
    const token = jwt.sign({}, process.env.JWT_SECRET, { subject: user._id.toString(), expiresIn: '7d' });
    res.json({ token, userId: user._id });
  } catch (e) {
    if (e.message === 'INVALID_CREDENTIALS') return res.status(401).json({ error: 'identifiants invalides' });
    next(e);
  }
}

async function logout(req, res) {
  res.json({ message: 'ok' });
}

module.exports = { login, logout };