const Redis = require('ioredis');
const config = require('../config/config');
const logger = require('../utils/logger');

class RedisService {
  constructor() {
    this.client = new Redis(config.redis);
    
    this.client.on('error', (error) => {
      logger.error('Redis Error:', error);
    });
  }

  async incrementRequests(key) {
    const multi = this.client.multi();
    multi.incr(key);
    multi.pexpire(key, config.rateLimit.windowMs);
    
    const [count] = await multi.exec();
    return count[1];
  }

  async getRemainingRequests(key) {
    const count = await this.client.get(key);
    return config.rateLimit.maxRequests - (count || 0);
  }
}

module.exports = new RedisService(); 
