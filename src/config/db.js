const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://mdadeebahmed04_db_user:UAxdzObu8LmH77n7@cluster0.ahrwarg.mongodb.net/?appName=Cluster0'
);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB Database connected successfully');
});

db.on('error', () => {
  console.log('Error in connecting to MongoDB Database');
});

module.exports = db;
