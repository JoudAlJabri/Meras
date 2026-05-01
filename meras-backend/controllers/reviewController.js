const Review = require("../models/Review");

exports.createReview = async (req, res) => {
    try {
      const { mentorId, bookingId, stars, text } = req.body;
  
      if (!mentorId || !bookingId || !stars) {
        return res.status(400).json({ message: "mentorId, bookingId, and stars are required" });
      }
  
      // prevent duplicate review
      const existingReview = await Review.findOne({ bookingId });
      if (existingReview) {
        return res.status(400).json({ message: "Review already submitted for this booking" });
      }
  
      const review = new Review({
        mentorId,
        bookingId,
        stars,
        text,
        explorerId: req.user.id,
      });
  
      const savedReview = await review.save();
  
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getReviewsByMentor = async (req, res) => {
    try {
      const { mentorId } = req.params;
  
      const reviews = await Review.find({ mentorId })
        .populate("explorerId", "name")
        .sort({ createdAt: -1 });
  
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };