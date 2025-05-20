const redisService = require('../services/redisService');
const messageQueueService = require('../services/messageQueueService');
const logger = require('../utils/logger');
const config = require('../config/config');

const rateLimiter = async (req, res, next) => {
  try {
    // Skip rate limiting for Chrome DevTools requests
    if (req.path.startsWith('/.well-known')) {
      return next();
    }

    // Use IP address or token as key
    const key = req.headers.authorization || req.ip;

    // Increment request count
    const requestCount = await redisService.incrementRequests(key);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', config.rateLimit.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, config.rateLimit.maxRequests - requestCount));

    console.log('Request count:', requestCount, 'Max requests:', config.rateLimit.maxRequests);
    logger.info('Rate limit status', {
      requestCount,
      maxRequests: config.rateLimit.maxRequests
    });

    if (requestCount > config.rateLimit.maxRequests) {
      // Log excessive requests to RabbitMQ
      logger.info('Rate limit exceeded!! count: ' + requestCount);

      await messageQueueService.logRateLimitEvent({
        timestamp: new Date(),
        key,
        requestCount,
        path: req.path
      });
      return res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: Math.ceil(config.rateLimit.windowMs / 1000) + " seconds"
      });
    }

    next();
  } catch (error) {
    logger.error('Rate limiter error:', error);
    next(error);
  }
};

module.exports = rateLimiter;
