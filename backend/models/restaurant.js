const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crete ninja Schema & model
const RestaurantSchema = new Schema({
  markId: {
    type: String,
    required: [true, 'unique markId is required to save restaurant']
  },
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  location: {
    type: String,
    required: [true, 'Location (string) is required']
  },
  cuisine: {
    type: String,
  },
  priceRange: {
    type: Number,
  }
  // total_reviews: {
  //   type: Number,
  //   default: 0,
  // },
  // average_rating: {
  //   type: Number,
  //   default: 0,
  // }
})

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;