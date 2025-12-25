const Book = require('../models/Book');

const getAllBooks = async (request, response) => {
  try {
    const books = await Book.find();
    response.status(200).json(books);
  } catch (error) {
    response.status(500).json(error.message);
  }
};

const getBookById = async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }
    response.status(200).json(book);
  } catch (error) {
    response.status(500).json(error.message);
  }
};

const createNewBook = (request, response) => {
  try {
    if (request.user.role !== 'LIBRARIAN') {
      return response
        .status(401)
        .json({ message: 'Access denied, you must be a librarian' });
    }

    const { name, author, publishedYear, price, quantity, status } =
      request.body;
    if (!name || !author || !publishedYear || !price || !quantity || !status) {
      return response.status(400).json({ message: 'All fields are required' });
    }

    const newBook = {
      name,
      author,
      publishedYear,
      price,
      quantity,
      status,
    };

    const book = new Book(newBook);
    book.save();
    response
      .status(201)
      .json({ message: 'Book created successfully', data: newBook });
  } catch (error) {
    response.status(500).json(error.message);
  }
};

const updateBook = async (request, response) => {
  try {
    if (request.user.role !== 'LIBRARIAN') {
      return response
        .status(401)
        .json({ message: 'Access denied, you must be a librarian' });
    }

    const book = await Book.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }
    const { name, author, publishedYear, price, quantity, status } =
      request.body;

    if (!name || !author || !publishedYear || !price || !quantity || !status) {
      return response.status(400).json({ message: 'All fields are required' });
    }
    book.name = name;
    book.author = author;
    book.publishedYear = publishedYear;
    book.price = price;
    book.quantity = quantity;
    book.status = status;
    response
      .status(200)
      .json({ message: 'Book updated successfully', data: book });
  } catch (error) {
    response.status(500).json(error.message);
  }
};

const deleteBook = async (request, response) => {
  try {
    if (request.user.role !== 'LIBRARIAN') {
      return response
        .status(401)
        .json({ message: 'Access denied, you must be a librarian' });
    }

    const bookIndex = await Book.findByIdAndDelete(request.params.id);
    if (bookIndex === -1) {
      return response.status(404).json({ message: 'Book not found' });
    }
    response.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    response.status(500).json(error.message);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
};
