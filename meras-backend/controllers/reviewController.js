const Review = require("../models/Review");
const User = require("../models/User");

exports.createReview = async (req, res) => {
    try {
      const { mentorId, bookingId, stars, text } = req.body;

      if (!mentorId || !stars) {
        return res.status(400).json({ message: "mentorId and stars are required" });
      }

      // prevent an explorer from rating the same mentor twice
      const existingReview = await Review.findOne({ mentorId, explorerId: req.user.id });
      if (existingReview) {
        return res.status(400).json({ message: "You have already rated this mentor" });
      }

      const review = new Review({
        mentorId,
        bookingId,
        stars,
        text,
        explorerId: req.user.id,
      });

      const savedReview = await review.save();

      // Push review into User.reviews[] and recalculate average rating
      await User.findByIdAndUpdate(mentorId, {
        $push: {
          reviews: {
            explorer: req.user.id,
            rating: stars,
            comment: text || "",
          },
        },
      });

      const allReviews = await Review.find({ mentorId });
      const avgRating =
        allReviews.reduce((sum, r) => sum + r.stars, 0) / allReviews.length;

      await User.findByIdAndUpdate(mentorId, {
        rating: Math.round(avgRating * 10) / 10,
      });

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