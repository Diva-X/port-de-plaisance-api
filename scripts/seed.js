// scripts/seed.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Initialise la connexion Mongo
require('../db/mongoose');

const mongoose = require('mongoose');
const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

async function importIfEmpty(Model, data, label) {
  const count = await Model.estimatedDocumentCount();
  if (count > 0) {
    console.log(`${label} déjà présents (${count}), import ignoré`);
    return;
  }
  await Model.insertMany(data);
  console.log(`Import ${label} OK (${data.length})`);
}

async function run() {
  try {
    // Charger les fichiers JSON
    const catwaysRaw = fs.readFileSync(path.join(__dirname, '..', 'catways.json'), 'utf8');
    const reservationsRaw = fs.readFileSync(path.join(__dirname, '..', 'reservations.json'), 'utf8');

    const catways = JSON.parse(catwaysRaw);
    const reservations = JSON.parse(reservationsRaw);

    // Importer
    await importIfEmpty(Catway, catways, 'catways');
    await importIfEmpty(Reservation, reservations, 'reservations');

    await mongoose.connection.close();
    console.log('Seed terminé, connexion Mongo fermée');
    process.exit(0);
  } catch (e) {
    console.error('Erreur seed:', e);
    process.exit(1);
  }
}

run();