const express = require('express');
const router = express.Router();
const CONTROLLER = require('../controllers/Categorie.controller');
const { validateId } = require('../middlewares/validation');

router.get('/all', CONTROLLER.getAllCategories);
router.get('/get/:id', validateId, CONTROLLER.getCategorie);

module.exports = router;