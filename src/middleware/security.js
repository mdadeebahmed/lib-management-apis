const ratelimit = require('express-rate-limit');
const helmet = require('helmet');

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' },
});

const securityHeaders = helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

module.exports = {
  limiter,
  securityHeaders,
};
