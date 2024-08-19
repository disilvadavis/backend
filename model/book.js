const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  publishedDate: {
    type: Date,
  },
  pages: {
    type: Number,
  },
});

module.exports = mongoose.model('Book', bookSchema);