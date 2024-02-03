import redis from '../../lib/redis-client';
import { appDataSource } from '../../dataSource';
import { NotFoundError } from '../../errors/NotFoundError';

export const getOneChristianService = async (id: string) => {
  const cacheKey = `getOneChristianService-${id}`;

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const christianRepository = appDataSource.getRepository('christians');
  const christian = await christianRepository.findOne({ where: { id } });

  if (!christian) throw new NotFoundError('Christian not found');

  await redis.set(cacheKey, JSON.stringify(christian));

  return christian;
};
