const express = require('express');
const path = require('path');
const rateLimiter = require('./middleware/rateLimiter');
const config = require('./config/config');
const logger = require('./utils/logger');
const routes = require('./routes');
const {
  errorHandler
} = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(rateLimiter);

// API Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

app.listen(config.server.port, () => {
  logger.info(`Server running on port ${config.server.port}`);
});
