Rate Limiter for an E-Commerce API (Node.js, Redis, Middleware, RabbitMQ/Kafka)


 * Task:
 * Implement a rate-limiting middleware for an Express.js API used in an e-commerce application.
 * 
 * Scenario:
 * - Customers browse and purchase items through an API.
 * - To prevent abuse, rate limits should be enforced per user (IP-based or token-based).
 * - Users should be limited to a configurable number of requests per time window (e.g., 100 requests per 15 minutes).
 * - Redis should be used to efficiently track request counts.
 * - If the rate limit is exceeded, respond with HTTP 429 (Too Many Requests).
 * - Implement proper logging and error handling.
 * - Use RabbitMQ/Kafka to log excessive requests and analyze patterns in real time.
 * 
 * Evaluation Criteria (Each marked out of 5):
 * - Correct use of Redis and RabbitMQ/Kafka for rate-limiting and analytics.
 * - Middleware design and efficiency.
 * - Flexibility and scalability of the implementation.
 * - Handling of edge cases and performance considerations.
 * - Extra point for UI/UX implementation.
 * 
 * GitHub Repository:
 * - Provide a GitHub repository link with the implementation.
 * - Include a `docker-compose.yml` file for easy setup.
 * - Provide a `run.sh` or `run.bat` script to start the application.
 
