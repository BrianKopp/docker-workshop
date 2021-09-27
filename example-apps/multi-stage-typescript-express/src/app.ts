import express from 'express';
import { Logger } from 'pino';
import { container } from 'tsyringe';

export const app = express();

// create health check
app.get('/', (_, res) => {
  res.json({ message: 'alive' });
});

app.get('/health', (_, res) => {
  const logger = container.resolve<Logger>('Logger');
  logger.debug('hit health check');
  res.json({ message: 'healthy' });
});
