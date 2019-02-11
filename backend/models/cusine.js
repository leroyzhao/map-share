const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crete ninja Schema & model
const CuisineSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Name field is required']
  },
  list: [{
    type: String,
  }]
})

const Cuisine = mongoose.model('restaurant', CuisineSchema);

module.exports = Cuisine;