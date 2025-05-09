const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reviewController = require('../Controller/review.controller');

// Create review (protected)
router.post('/performers/:performerId/reviews', auth, reviewController.createReview);

// Get all reviews for a performer (public)
router.get('/performers/:performerId/reviews', reviewController.getPerformerReviews);

module.exports = router;
