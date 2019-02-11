const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create restaurant Schema & model
const RestaurantSchema = new Schema({
  markId: {
    type: String,
    required: [true, 'unique markId is required to save restaurant']
  },
  restaurantName: {
    type: String,
    required: [true, 'restaurantName field is required']
  },
  restaurantLocation: {
    type: String,
    required: [true, 'restaurantLocation (string) is required']
  },
  restaurantCuisine: {
    type: String,
  },
  restaurantPriceRange: {
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