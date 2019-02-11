const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create mark Schema & model
const MarkSchema = new Schema({
  markId: {
    type: String,
    required: [true, 'unique markId is required to save user / OR USE _OID????']
  },
  markCoordinates: {
    long: Number,
    lat: Number,
  },
  restaurantId: {
    type: String,
    required: [true, 'corresponding restaurantId required for mark']
  }
})

const Mark = mongoose.model('mark', MarkSchema);

module.exports = Mark;