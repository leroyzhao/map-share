const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crete ninja Schema & model
const GroupSchema = new Schema({
  groupName: {
    type: String,
    required: [true, 'groupName field is required']
  },
  members: [{
    type: String,
  }]
})

const Group = mongoose.model('restaurant', GroupSchema);

module.exports = Group;