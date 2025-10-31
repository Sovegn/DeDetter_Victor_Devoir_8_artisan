const express = require('express');
const router = express.Router();
const CONTROLLER = require('../controllers/Specialite.controller');
const { validateId } = require('../middlewares/validation');


router.get('/all', CONTROLLER.getAllSpecialites);
router.get('/get/:id', validateId, CONTROLLER.getSpecialite);
router.get('/categorie/:categorieId', validateId, CONTROLLER.getSpecialitesByCategorie);

module.exports = router;