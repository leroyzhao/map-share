const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crete ninja Schema & model
const RestaurantSchema = new Schema({
  mark_id: {
    type: String,
    required: [true, 'unique mark_id is required to save restaurant']
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
  price_range: {
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