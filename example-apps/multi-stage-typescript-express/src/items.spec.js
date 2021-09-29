const winston = require('winston');
const { Items } = require('./items');

describe('Items test', () => {
  const redisMock = {
    smembers: jest.fn(),
    sadd: jest.fn(),
    srem: jest.fn(),
  };
  const logger = winston.createLogger({
    level: 'debug',
    transports: [new winston.transports.Console()],
  });
  /** @type {Items} */
  let itemsDb = null;
  beforeEach(() => {
    jest.resetAllMocks();
    itemsDb = new Items(logger, redisMock);
  });

  it('should get items', async () => {
    redisMock.smembers.mockImplementationOnce((key, cb) => {
      cb(null, ['item_one', 'item_two']);
    });
    const foundItems = await itemsDb.getItems();
    expect(foundItems).toEqual(['item_one', 'item_two']);
  });
});
