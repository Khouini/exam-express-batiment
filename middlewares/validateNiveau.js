const yup = require('yup');

module.exports = async function validateNiveau(req, res, next) {
  try {
    const schema = yup.object().shape({
      nom: yup.string().required(),
      nbr_chambre: yup.number().required(),
      id_batiment: yup.string().required(),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
