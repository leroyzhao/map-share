const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create mark Schema & model
const MarkSchema = new Schema({
  locationId: {
    type: Schema.Types.ObjectId,
    required: [true, 'unique locationId is required to save user / OR USE _OID????']
  },
  markCoordinates: {
    long: Number,
    lat: Number,
  },
  restaurantId: {
    type: String,
    //required: [true, 'corresponding restaurantId required for mark']
  },
  groupId: Schema.Types.ObjectId
})
// , {
//   toObject: {virtuals: true},
//   toJSON: {virtuals: true}
// })

const Mark = mongoose.model('mark', MarkSchema);

module.exports = Mark;