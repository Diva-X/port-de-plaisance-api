require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI manquant dans .env');
  process.exit(1);
}

mongoose.set('strictQuery', true);

mongoose.connect(uri)
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => {
    console.error('Erreur connexion MongoDB :', err.message);
    process.exit(1);
  });