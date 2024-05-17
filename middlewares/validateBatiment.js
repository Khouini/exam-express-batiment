const yup = require('yup');
module.exports = async function validate(req, res, next) {
  try {
    const schema = yup.object().shape({
      nom: yup.string().required(),
      description: yup.string().required(),
      adresse: yup.string().required(),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// nom: String,
// nbr_chambre: Number,
// etat_construction: Boolean,
// id_batiment: String,
// });
