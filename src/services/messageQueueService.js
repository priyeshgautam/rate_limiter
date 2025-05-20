const amqp = require('amqplib');
const config = require('../config/config');
const logger = require('../utils/logger');

class MessageQueueService {
  constructor() {
    this.channel = null;
    this.connect();
  }

  async connect() {
    try {
      const connection = await amqp.connect(config.rabbitmq.url);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(config.rabbitmq.queue, { durable: true });
    } catch (error) {
      logger.error('RabbitMQ Connection Error:', error);
    }
  }

  async logRateLimitEvent(data) {
    if (!this.channel) {
      await this.connect();
    }

    try {
      this.channel.sendToQueue(
        config.rabbitmq.queue,
        Buffer.from(JSON.stringify(data))
      );
    } catch (error) {
      logger.error('Failed to log rate limit event:', error);
    }
  }
}

module.exports = new MessageQueueService(); 
