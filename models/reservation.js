// models/reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  clientName: { type: String, required: true },
  boatName: { type: String, required: true },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator(v) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // minuit, pour ignorer l'heure
        return v >= today;
      },
      message: 'startDate ne peut pas être dans le passé'
    }
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator(v) {
        return this.startDate && v > this.startDate;
      },
      message: 'endDate doit être strictement après startDate'
    }
  }
}, { timestamps: true });

// Ajoute un index pour optimiser la détection des chevauchements
reservationSchema.index({ catwayNumber: 1, startDate: 1, endDate: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);