# E-Commerce API

A RESTful API service built with Node.js and Express for managing products and orders, featuring a robust rate limiter middleware that prevents API abuse by limiting requests per user based on IP or token, with Redis for efficient tracking and RabbitMQ for real-time analytics of request patterns.

## Problem Statement
See the [problem statement](problem-statement.md) for details on the rate limiter implementation requirements.


## Tech Stack
This project is built with the following technologies:

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for Node.js
- **RabbitMQ** - Message broker for handling asynchronous tasks, event-driven communication, and logging excessive API requests for real-time pattern analysis
- **Redis** - In-memory data store used for caching, improving performance, and efficiently tracking request counts for rate limiting
- **Winston** - Logging library for comprehensive error tracking and monitoring
- **Docker** - Containerization for consistent development and deployment
- **Analyzer Service** - Dedicated microservice that consumes messages from RabbitMQ to analyze request patterns, detect potential abuse, and generate insights on API usage



## Project Structure 

src/
├── app.js # Main application file
├── config # Configuration files
├── controllers # Controller files
├── middleware # Middleware files
├── models # Model files
├── routes # Route files
├── schemas # Schema files
├── services # Service files
├── utils # Utility files

## API Endpoints

### Products

- `GET /api/products` - Get all products

### Orders

- `GET /api/orders` - Get all orders


## Demo Files

The `demo_working` directory contains demonstration files and screenshots showcasing the application's functionality:

- `Screen Recording 2025-05-20 at 12.mp4` - Video demonstration of the API in action
- `Response: 429.png` - Screenshot showing rate limit exceeded response (HTTP 429)
- `Response: 200.png` - Screenshot showing successful API response (HTTP 200)
- `RabbitMQ_dashboard.png` - Screenshot of RabbitMQ management dashboard
- `redis-cli.png` - Screenshot showing Redis CLI operations
- `rabbitmq-cli.png` - Screenshot demonstrating RabbitMQ CLI commands

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
git clone <repository-url>

2. Install dependencies:
npm install


## Development Tools

### Docker Setup

1. Install Docker Desktop:
```bash
brew install --cask docker
```

2. Start the application using Docker Compose:
```bash
docker compose up --build
```

3. To stop the containers:
   - Press `Ctrl+C` if running in foreground
   - OR run `docker compose down`

### RabbitMQ Management

- Access RabbitMQ management interface at: http://localhost:15672/
- Default credentials:
  - Username: guest
  - Password: guest
- Features:
  - Monitor queues and exchanges
  - View message rates
  - Manage users and permissions
  - Check connection status

#### RabbitMQ CLI Commands

1. List all queues and their messages:
```bash
rabbitmqctl list_queues
```

2. Purge all messages from a specific queue:
```bash
rabbitmqctl purge_queue rate-limit-events
```

3. Other useful commands:
- `rabbitmqctl list_exchanges` - List all exchanges
- `rabbitmqctl list_bindings` - List all bindings
- `rabbitmqctl list_connections` - Show all connections
- `rabbitmqctl status` - Display node status

### Redis CLI

1. Connect to Redis CLI:
```bash
redis-cli
```

2. Common Redis commands:
```bash
# List all keys
KEYS '*'

# Get value for a specific key
GET <key-name>
```

3. Useful Redis operations:
- `SET key value` - Set a key-value pair
- `DEL key` - Delete a key
- `TTL key` - Check remaining time-to-live for a key
- `FLUSHALL` - Clear all keys (use with caution)

### Winston Logging

1. Check log files in the logs directory:
```bash
# View the latest logs
tail -f logs/error.log    # For error logs
tail -f logs/combined.log # For all logs
```

2. Search for specific log entries:
```bash
# Search for error logs
grep "error" logs/combined.log

# Search for rate limit events
grep "rate limit" logs/combined.log
```

3. Common log locations:
- `logs/error.log` - Contains error-level logs
- `logs/combined.log` - Contains all log levels (error, warn, info, debug)
- `logs/exceptions.log` - Contains uncaught exceptions (if configured)

4. Docker container logs:
```bash
# View logs from the API container
docker logs equentis_assignment-app-1

# Follow logs in real-time
docker logs -f equentis_assignment-app-1

# View Redis logs
docker logs equentis_assignment-redis-1

# View RabbitMQ logs
docker logs equentis_assignment-rabbitmq-1
```

Note: Container names might vary based on your project name and Docker Compose configuration. Use `docker ps` to verify the correct container names.





