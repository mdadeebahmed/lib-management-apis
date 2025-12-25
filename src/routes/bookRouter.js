const express = require('express');

const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBookById);
bookRouter.post('/', authMiddleware, createNewBook);
bookRouter.put('/:id', authMiddleware, updateBook);
bookRouter.delete('/:id', authMiddleware, deleteBook);

module.exports = bookRouter;
