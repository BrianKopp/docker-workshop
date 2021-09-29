import 'reflect-metadata';
import { createClient, RedisClient } from 'redis';
import { container } from 'tsyringe';
import { Logger } from 'winston';

import { app } from './app';
import { Items } from './items';
import { makeLogger } from './logger';

// register dependencies
const logger = makeLogger(process.env.LOG_LEVEL);
container.register<Logger>('Logger', { useValue: logger });

// set up redis connection
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: Number.parseInt(process.env.REDIS_PORT || '6379'),
});
container.register(RedisClient.name, { useValue: redisClient });

container.register(Items.name, { useClass: Items });

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
