const express = require('express');
const bookRouter = require('./src/routes/bookRouter');
const issueBookRouter = require('./src/routes/issueBookRouter');
const userRouter = require('./src/routes/userRouter');
// const User = require('./src/models/user');
const { limiter, securityHeaders } = require('./src/middleware/security');
const db = require('./src/config/db');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors('*'));

app.use(express.json());

// Apply security middlewares
app.use(limiter);
app.use(securityHeaders);

const PORT = process.env.PORT || 4000;

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
};

app.use(logger);

app.get('/health', (req, resp) => {
  resp.status(200).json({
    status: 'Ok',
    message: 'Server is healthy',
  });
});

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/issue-books', issueBookRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  console.log('Server is running on port 4000');
});
