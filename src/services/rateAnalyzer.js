const amqp = require('amqplib');
const config = require('../config/config');
const logger = require('../utils/logger');

class RateAnalyzer {
  constructor() {
    this.channel = null;
    this.stats = {
      totalViolations: 0,
      pathStats: {},
      ipStats: {},
      timeWindows: {}
    };
  }

  async connect() {
    try {
      const connection = await amqp.connect(config.rabbitmq.url);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(config.rabbitmq.queue, {
        durable: true
      });
    } catch (error) {
      logger.error('RateAnalyzer Connection Error:', error);
    }
  }

  async startAnalyzing() {
    if (!this.channel) {
      await this.connect();
    }

    this.channel.consume(config.rabbitmq.queue, (msg) => {
      if (msg) {
        this.processMessage(JSON.parse(msg.content.toString()));
        this.channel.ack(msg);
      }
    });

    // Print analytics every 5 seconds
    setInterval(() => this.printAnalytics(), 5000);
  }

  processMessage(data) {
    const {
      timestamp,
      key,
      requestCount,
      path
    } = data;
    const hour = new Date(timestamp).getHours();

    // Update total violations
    this.stats.totalViolations++;

    // Update path statistics
    if (!this.stats.pathStats[path]) {
      this.stats.pathStats[path] = 0;
    }
    this.stats.pathStats[path]++;

    // Update IP statistics
    if (!this.stats.ipStats[key]) {
      this.stats.ipStats[key] = {
        violations: 0,
        maxRequestCount: 0,
        lastViolation: null
      };
    }
    this.stats.ipStats[key].violations++;
    this.stats.ipStats[key].maxRequestCount = Math.max(
      this.stats.ipStats[key].maxRequestCount,
      requestCount
    );
    this.stats.ipStats[key].lastViolation = timestamp;

    // Update time window statistics
    if (!this.stats.timeWindows[hour]) {
      this.stats.timeWindows[hour] = 0;
    }
    this.stats.timeWindows[hour]++;

    // Log suspicious activity (high request count)
    if (requestCount > config.rateLimit.maxRequests * 2) {
      logger.warn('Suspicious activity detected', {
        ip: key,
        requestCount,
        path,
        timestamp
      });
    }
  }

  printAnalytics() {
    console.clear();
    console.log('\n=== Rate Limit Analytics ===\n');

    console.log('Total Violations:', this.stats.totalViolations);

    console.log('\nMost Violated Endpoints:');
    Object.entries(this.stats.pathStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .forEach(([path, count]) => {
        console.log(`${path}: ${count} violations`);
      });

    console.log('\nTop Offending IPs:');
    Object.entries(this.stats.ipStats)
      .sort(([, a], [, b]) => b.violations - a.violations)
      .slice(0, 5)
      .forEach(([ip, stats]) => {
        console.log(`${ip}:`);
        console.log(`  Violations: ${stats.violations}`);
        console.log(`  Max Request Count: ${stats.maxRequestCount}`);
        console.log(`  Last Violation: ${new Date(stats.lastViolation).toLocaleString()}`);
      });

    console.log('\nViolations by Hour:');
    Object.entries(this.stats.timeWindows)
      .sort(([a], [b]) => a - b)
      .forEach(([hour, count]) => {
        console.log(`${hour}:00 - ${count} violations`);
      });
  }
}

module.exports = new RateAnalyzer();
