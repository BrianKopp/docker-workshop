import express from 'express';
import { container } from 'tsyringe';
import { Logger } from 'winston';

import { Items } from './items';

export const app = express();
app.use(express.json());

// create health check
app.get('/', (_, res) => {
  res.json({ message: 'alive' });
});

app.get('/health', (_, res) => {
  const logger = container.resolve<Logger>('Logger');
  logger.debug('hit health check');
  res.json({ message: 'healthy' });
});

app.get('/items', async (_, res) => {
  const logger = container.resolve<Logger>('Logger');
  try {
    const itemDb = container.resolve<Items>(Items.name);
    const items = await itemDb.getItems();
    res.json({ items });
  } catch (err) {
    logger.error('error getting items', { error: err });
    res.status(500).json({ message: 'internal error' });
  }
});

app.post('/items', async (req, res) => {
  const logger = container.resolve<Logger>('Logger');
  if (!req?.body?.item) {
    logger.warn('cannot POST /items, no item found in body');
    res.status(400).json({ message: 'bad request' });
    return;
  }
  try {
    const itemDb = container.resolve<Items>(Items.name);
    await itemDb.addItem(req.body.item);
    res.status(201).json({ message: 'added item' });
  } catch (err) {
    logger.error('error adding item', { err: err });
    // console.error('error', err);
    res.status(500).json({ message: 'internal error' });
  }
});

app.delete('/items/:item', async (req, res) => {
  const logger = container.resolve<Logger>('Logger');
  if (!req.params.item) {
    logger.warn('cannot DELETE /items, no item found in path');
    res.status(400).json({ message: 'bad request' });
    return;
  }
  try {
    const itemDb = container.resolve<Items>(Items.name);
    await itemDb.deleteItem(req.params.item);
    res.sendStatus(204);
  } catch (err) {
    logger.error('error deleting item', { error: err });
    res.status(500).json({ message: 'internal error' });
  }
});
