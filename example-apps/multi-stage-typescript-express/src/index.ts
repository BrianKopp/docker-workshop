import { createClient } from 'redis';

import { createApp } from './app';
import { Items } from './items';
import { makeLogger } from './logger';

const logger = makeLogger(process.env.LOG_LEVEL);

// set up redis connection
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: Number.parseInt(process.env.REDIS_PORT || '6379'),
});

const items = new Items(logger, redisClient);

const app = createApp(logger, items);

// set up the http server
const port = Number.parseInt(process.env.PORT || '3000');
if (Number.isNaN(port)) {
  logger.error('port is invalid', { port });
  process.exit(1);
}

const server = app.listen(port, () => {
  logger.info(`server listening on port ${port}`);
});

const shutdown = () => {
  logger.info('received signal, closing server');
  server.close((err) => {
    if (err) {
      logger.error('error closing server', { error: err });
      process.exit(1);
    }
    logger.info('server closed successfully');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
