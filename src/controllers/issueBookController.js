const User = require('../models/User');
const Book = require('../models/Book');
const IssueBook = require('../models/IssueBook');

const issueBook = async (request, response) => {
  try {
    if (request.user.role !== 'LIBRARIAN') {
      return response
        .status(401)
        .json({ message: 'Access denied, you must be a librarian' });
    }

    const { bookId, bookName, studentId, studentName, issueDate, returnDate } =
      request.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return response.status(404).json({ message: 'Student not found' });
    }

    if (book.quantity < 1) {
      return response.status(400).json({ message: 'Book is not available' });
    }

    const newIssueBook = {
      bookId,
      bookName,
      studentId,
      studentName,
      issueDate,
      returnDate,
    };

    const issueBook = new IssueBook(newIssueBook);
    await issueBook.save();

    book.quantity -= 1;
    await book.save();

    response
      .status(201)
      .json({ message: 'Book issued successfully', data: newIssueBook });
  } catch (error) {
    response.status(500).json(error.message);
  }
};

const returnBook = async (request, response) => {
  try {
    if (request.user.role !== 'LIBRARIAN') {
      return response
        .status(401)
        .json({ message: 'Access denied, you must be a librarian' });
    }

    const issueBookData = await IssueBook.findById(request.params.id);

    if (!issueBookData) {
      return response
        .status(404)
        .json({ message: 'Issued book record not found' });
    }

    if (issueBookData.status === 'returned') {
      return response.status(400).json({ message: 'Book already returned' });
    }

    issueBookData.status = 'returned';
    await issueBookData.save();

    const book = await Book.findById(issueBookData.bookId);
    book.quantity += 1;
    await book.save();

    response
      .status(200)
      .json({ message: 'Book returned successfully', data: issueBookData });
  } catch (error) {
    response.status(500).json(error.message);
  }
};

module.exports = {
  issueBook,
  returnBook,
};
