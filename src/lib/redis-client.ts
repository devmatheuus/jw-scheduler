import 'dotenv/config';
import IoRedis from 'ioredis';

const redis = new IoRedis({
  host: process.env.REDIS_HOST,
  port: 6379,
});

redis.on('error', () => {
  throw new Error('Error on connect to redis');
});

export default redis;
