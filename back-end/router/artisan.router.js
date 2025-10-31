const express = require('express');
const router = express.Router();
const CONTROLLER = require('../controllers/Artisan.controller');
const { validateId, validateSearch } = require('../middlewares/validation');


router.get('/all', CONTROLLER.getAllArtisans);
router.get('/get/:id', validateId, CONTROLLER.getArtisan);
router.get('/categorie/:categorieId', validateId, CONTROLLER.getArtisansByCategorie);
router.get('/top', CONTROLLER.getArtisansDuMois);
router.get('/search', validateSearch, CONTROLLER.searchArtisans);

module.exports = router;