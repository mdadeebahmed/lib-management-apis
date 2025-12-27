require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI
);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB Database connected successfully');
});

db.on('error', () => {
  console.log('Error in connecting to MongoDB Database');
});

module.exports = db;
