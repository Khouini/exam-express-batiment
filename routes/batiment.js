const router = require('express').Router();
const {
  addBatiment,
  deleteBatiment,
  getBatiments,
  getBatiment,
  addNiveau,
  construction,
} = require('../controllers/batiment');
const validator = require('../middlewares/validateBatiment');
const validateNiveau = require('../middlewares/validateNiveau');
router.get('/', getBatiments);
router.post('/', validator, addBatiment);
router.get('/niveau', (req, res, next) => {
  res.render('niveau');
});
router.delete('/:id', deleteBatiment);
router.get('/:id', getBatiment);
router.post('/addniveau', validateNiveau, addNiveau);
router.put('/construction/:idNiveau', construction);

module.exports = router;
