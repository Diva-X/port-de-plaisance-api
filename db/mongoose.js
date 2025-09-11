const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => {
    console.error('MongoDB ERREUR:', err.message);
    process.exit(1);
  });

// pour voir les erreurs après coup
mongoose.connection.on('error', err => console.error('Mongoose conn error:', err));