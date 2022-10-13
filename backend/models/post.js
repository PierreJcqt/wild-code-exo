const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);