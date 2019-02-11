const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crete ninja Schema & model
const ReviewSchema = new Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
    required: [true, 'restaurantId is required to save review']
  },
  reviews: [{
    reviewId: mongoose.Schema.Types.ObjectId,
    content: {
      type: String,
      required: [true, 'content is required to save review']
    },
    rating: {
      type: Number,
      required: [true, 'rating is required to save review']
    },
    userName: {
      type: String,
      required: [true, 'username is required to save review']
    },
  }]
})

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;