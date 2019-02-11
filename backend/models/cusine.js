const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crete ninja Schema & model
const CuisineSchema = new Schema({
  cuisineType: {
    type: String,
    required: [true, 'Name field is required']
  },
  list: [{
    type: String,
  }]
})

const Cuisine = mongoose.model('cuisine', CuisineSchema);

module.exports = Cuisine;