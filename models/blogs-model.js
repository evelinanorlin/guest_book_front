const mongoose = require('mongoose');

const BlogsSchema = mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  blogPost: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now()
  }
})

module.exports = mongoose.model('blogs', BlogsSchema)