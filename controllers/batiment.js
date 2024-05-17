const BatimentModel = require('../models/Batiment');
const NiveauModel = require('../models/Niveau');
async function addBatiment(req, res) {
  try {
    req.body.nbr_niveau = 0;
    const batiment = new BatimentModel(req.body);
    const savedBatiment = await batiment.save();
    return res.json(savedBatiment);
  } catch (error) {
    console.log('🚀 ~ router.get ~ error:', error.message);
    return res.status(400).send({
      error,
    });
  }
}

async function deleteBatiment(req, res) {
  try {
    const { id } = req.params;
    const deletedBatiment = await BatimentModel.findByIdAndDelete(id);
    return res.json(deletedBatiment);
  } catch (error) {
    console.log('🚀 ~ router.delete ~ error:', error.message);
    return res.status(400).send({
      error,
    });
  }
}

async function getBatiments(req, res) {
  try {
    const batiments = await BatimentModel.find();
    return res.json(batiments);
  } catch (error) {
    console.log('🚀 ~ router.get ~ error:', error.message);
    return res.status(400).send({
      error,
    });
  }
}
async function getBatiment(req, res) {
  try {
    const { id } = req.params;
    const batiments = await BatimentModel.findById(id);
    return res.json(batiments);
  } catch (error) {
    console.log('🚀 ~ router.get ~ error:', error.message);
    return res.status(400).send({
      error,
    });
  }
}

async function addNiveau(req, res) {
  try {
    const batiment = await BatimentModel.findById(req.body.id_batiment);
    console.log('🚀 ~ addNiveau ~ batiment:', batiment);
    if (!batiment) {
      throw new Error('Batiment not found');
    }
    req.body.etat_construction = false;
    const niveau = new NiveauModel(req.body);
    const savedniveau = await niveau.save();
    return res.json(savedniveau);
  } catch (error) {
    console.log('🚀 ~ router.get ~ error:', error.message);
    return res.status(400).send({
      error: error.message,
    });
  }
}
async function construction(req, res) {
  try {
    const { idNiveau } = req.params;
    const niveau = await NiveauModel.findById(idNiveau);
    console.log('🚀 ~ construction ~ niveau:', niveau);
    if (!niveau) {
      throw new Error('niveau not found!');
    }
    const batiment = await BatimentModel.findById(niveau.id_batiment);
    if (!batiment) {
      throw new Error('batiment not found!');
    }
    const response = {};

    if (niveau.etat_construction === false) {
      batiment.nbr_niveau = batiment.nbr_niveau + 1;
      const savedBatiment = await batiment.save();
      console.log('🚀 ~ construction ~ savedBatiment:', savedBatiment);
      response.savedBatiment = savedBatiment;
    }
    niveau.etat_construction = true;

    const savedniveau = await niveau.save();
    console.log('🚀 ~ construction ~ savedniveau:', savedniveau);
    response.savedNiveau = savedniveau;
    return res.json(response);
  } catch (error) {
    console.log('🚀 ~ router.get ~ error:', error.message);
    return res.status(400).send({
      error: error.message,
    });
  }
}

module.exports = {
  deleteBatiment,
  getBatiments,
  addBatiment,
  getBatiment,
  addNiveau,
  construction,
};
