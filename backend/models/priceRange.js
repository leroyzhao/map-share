const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create priceRange Schema & model
const PriceRangeSchema = new Schema({
  priceRange: {
    type: Number,
    required: [true, 'priceRange field is required, integers 1,2,3']
  },
  restaurantList: [{
    type: String,
  }]
})

const PriceRange = mongoose.model('priceRange', PriceRangeSchema);

module.exports = PriceRange;