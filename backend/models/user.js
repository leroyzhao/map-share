const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create user Schema & model
const UserSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'unique userId is required to save user / OR USE _OID????']
  },
  userEmail: {
    type: String,
    required: [true, 'Name field is required']
  },
  userFirstName: {
    type: String,
    required: [true, 'user firstName is required']
  },
  userLastName: {
    type: String,
    required: [true, 'user lastName is required']
  },
  userGroupId: String
})

const User = mongoose.model('user', UserSchema);

module.exports = User;