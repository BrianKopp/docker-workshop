import 'reflect-metadata';
import pino, { Logger } from 'pino';
import { container } from 'tsyringe';

import { app } from './app';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});
container.register<Logger>('Logger', { useValue: logger });

const port = Number.parseInt(process.env.PORT || '3000');
if (Number.isNaN(port)) {
  logger.fatal('port is invalid', { port });
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
