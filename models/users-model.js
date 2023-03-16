const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  loggedIn: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('user', UsersSchema);