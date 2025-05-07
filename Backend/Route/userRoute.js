const express = require('express');
const { signup, signin, update } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/update', authMiddleware, update);

module.exports = router;
