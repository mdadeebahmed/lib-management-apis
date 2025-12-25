const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (request, response, next) => {
  const { token } = request.headers;
  if (!token) {
    return response
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return response.status(401).json({ message: 'Invalid token.' });
  }

  request.user = decodedToken;
  next();
};

module.exports = authMiddleware;
