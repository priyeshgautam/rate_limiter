const rateAnalyzer = require('./services/rateAnalyzer');
const logger = require('./utils/logger');

async function main() {
  try {
    logger.info('Starting Rate Limit Analyzer...');
    await rateAnalyzer.startAnalyzing();
    logger.info('Rate Limit Analyzer is running...');
  } catch (error) {
    logger.error('Failed to start analyzer:', error);
    process.exit(1);
  }
}

main(); 
