const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create review Schema & model
const ReviewSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    required: [true, 'restarantId is required for review']
  },
  reviewContent: {
    type: String,
    required: [true, 'content is required to save review']
  },
  reviewRating: {
    type: Number,
    required: [true, 'rating is required to save review']
  },
  reviewUser: {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'userId is required to save review']
    },
    userName: String
  },
})

// const ReviewSchema = new Schema({
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'restaurant',
//     required: [true, 'restaurantId is required to save review']
//   },
//   reviewList: [{
//     reviewId: mongoose.Schema.Types.ObjectId,
//     reviewContent: {
//       type: String,
//       required: [true, 'content is required to save review']
//     },
//     reviewRating: {
//       type: Number,
//       required: [true, 'rating is required to save review']
//     },
//     reviewUser: {
//       type: String,
//       required: [true, 'reviewUser is required to save review']
//     },
//   }]
// })

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;