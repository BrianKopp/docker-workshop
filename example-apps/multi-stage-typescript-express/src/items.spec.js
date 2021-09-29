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
    expect(redisMock.smembers).toHaveBeenCalledTimes(1);
    expect(redisMock.smembers.mock.calls[0][0]).toEqual('somekey');
  });

  it('should set item', async () => {
    redisMock.sadd.mockImplementationOnce((key, value, cb) => {
      cb(null);
    });
    await itemsDb.addItem('foobar');
    expect(redisMock.sadd).toHaveBeenCalledTimes(1);
    expect(redisMock.sadd.mock.calls[0][0]).toEqual('somekey');
    expect(redisMock.sadd.mock.calls[0][1]).toEqual('foobar');
  });

  it('should get items', async () => {
    redisMock.srem.mockImplementationOnce((key, value, cb) => {
      cb(null);
    });
    await itemsDb.deleteItem('foobar');
    expect(redisMock.srem).toHaveBeenCalledTimes(1);
    expect(redisMock.srem.mock.calls[0][0]).toEqual('somekey');
    expect(redisMock.srem.mock.calls[0][1]).toEqual('foobar');
  });
});
