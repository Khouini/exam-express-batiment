const mongoose = require('mongoose');
const BatimentSchema = new mongoose.Schema({
  nom: String,
  nbr_niveau: Number,
  description: String,
  adresse: String,
});

module.exports = mongoose.model('Batiment', BatimentSchema);
