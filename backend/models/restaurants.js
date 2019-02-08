const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crete ninja Schema & model
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  location: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false
  }
})

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;