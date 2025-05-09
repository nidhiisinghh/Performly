const express = require('express');
const router = express.Router();
const performerController = require('../Controller/performer.controller');
const auth = require('../middleware/auth');

// Performer Auth Routes
router.post('/performers/signup', performerController.signup);
router.post('/performers/signin', performerController.signin);

// Performer Profile Update (Protected)
router.put('/performers/update', auth, performerController.update);

module.exports = router;
