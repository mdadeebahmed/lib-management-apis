const mongoose = require('mongoose');

const bookSchema = {
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['AVAILABLE', 'UNAVAILABLE'],
    default: 'AVAILABLE',
    uppercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
