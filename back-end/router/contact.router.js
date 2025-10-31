const express = require('express');
const router = express.Router();
const CONTROLLER = require('../controllers/Contact.controller');
const { validateContactForm, validateId } = require('../middlewares/validation');


router.post('/send', validateContactForm, CONTROLLER.sendContact);

module.exports = router;