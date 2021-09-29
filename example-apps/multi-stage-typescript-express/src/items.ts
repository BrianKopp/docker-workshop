import { RedisClient } from 'redis';
import { Logger } from 'winston';

export class Items {
  private redisSetKey: string;

  constructor(private logger: Logger, private client: RedisClient) {
    this.redisSetKey = 'somekey';
  }

  async getItems(): Promise<string[]> {
    this.logger.debug('getting items');
    return new Promise<string[]>((resolve, reject) => {
      this.client.smembers(this.redisSetKey, (err, reply) => {
        if (err) {
          this.logger.error('error geting redis members', { error: err, key: this.redisSetKey });
          reject(err);
          return;
        }
        if (reply === null) {
          this.logger.info('no set found', { key: this.redisSetKey });
          resolve([]);
          return;
        }
        this.logger.debug('found members at redis key', { key: this.redisSetKey });
        resolve(reply);
      });
    });
  }

  async addItem(item: string): Promise<void> {
    this.logger.debug('adding item', { item });
    return new Promise<void>((resolve, reject) => {
      this.client.sadd(this.redisSetKey, item, (err) => {
        if (err) {
          this.logger.error('error adding member to redis set', {
            error: err,
            key: this.redisSetKey,
            item,
          });
          reject(err);
          return;
        }
        this.logger.info('successfullly added member to set', { key: this.redisSetKey, item });
        resolve();
      });
    });
  }

  async deleteItem(item: string): Promise<void> {
    this.logger.debug('deleting item', { item });
    return new Promise<void>((resolve, reject) => {
      this.client.srem(this.redisSetKey, item, (err) => {
        if (err) {
          this.logger.error('error deleting member from redis set', {
            error: err,
            key: this.redisSetKey,
            item,
          });
          reject(err);
          return;
        }
        this.logger.info('successfullly deleted member from set', { key: this.redisSetKey, item });
        resolve();
      });
    });
  }
}
