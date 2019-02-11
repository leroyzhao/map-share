const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create group Schema & model
const GroupSchema = new Schema({
  groupName: {
    type: String,
    required: [true, 'groupName field is required']
  },
  groupMembers: [{
    type: String,
  }]
})

const Group = mongoose.model('group', GroupSchema);

module.exports = Group;