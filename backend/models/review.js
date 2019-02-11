const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create review Schema & model
const ReviewSchema = new Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
    required: [true, 'restaurantId is required to save review']
  },
  reviewList: [{
    reviewId: Schema.Types.ObjectId,
    reviewContent: {
      type: String,
      required: [true, 'content is required to save review']
    },
    reviewRating: {
      type: Number,
      required: [true, 'rating is required to save review']
    },
    reviewUser: {
      type: String,
      required: [true, 'reviewUser is required to save review']
    },
  }]
})

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;