const express = require('express');

const { issueBook, returnBook } = require('../controllers/issueBookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, issueBook);
router.put('/:id', authMiddleware, returnBook);

module.exports = router;
