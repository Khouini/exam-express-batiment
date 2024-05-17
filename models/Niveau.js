const mongoose = require('mongoose');
const NiveauSchema = new mongoose.Schema({
  nom: String,
  nbr_chambre: Number,
  etat_construction: Boolean,
  id_batiment: String,
});

module.exports = mongoose.model('Niveau', NiveauSchema);
