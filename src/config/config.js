module.exports = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    queue: 'rate-limit-events'
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 20, // max requests per window
  },
  server: {
    port: process.env.PORT || 3000
  }
};
