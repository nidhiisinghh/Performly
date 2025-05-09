const Review = require('../db/modules/reviewSchema');
const Performer = require('../db/modules/performer');

const createReview = async (req, res) => {
  try {
    const { performerId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // Check performer exists
    const performer = await Performer.findById(performerId);
    if (!performer) return res.status(404).json({ message: "Performer not found" });

    // Create review
    const newReview = await Review.create({
      user: userId,
      performer: performerId,
      rating,
      comment,
    });

    // Recalculate average rating
    const reviews = await Review.find({ performer: performerId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    // Update performer's rating
    await Performer.findByIdAndUpdate(performerId, { rating: avgRating });

    res.status(201).json({ message: "Review added", review: newReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPerformerReviews = async (req, res) => {
  try {
    const { performerId } = req.params;

    const performer = await Performer.findById(performerId);
    if (!performer) return res.status(404).json({ message: "Performer not found" });

    const reviews = await Review.find({ performer: performerId })
      .populate('user', 'name email') // Include user info
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({ performer: performer.name, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createReview,
  getPerformerReviews
};
