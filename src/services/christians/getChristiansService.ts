import { appDataSource } from '../../dataSource';
import { ChristianRoles } from '../../types/christian/roles';
import redis from '../../lib/redis-client';

type GetChristianServiceProps = {
  role?: ChristianRoles;
  gender?: 'female' | 'male';
};

export const getChristiansService = async ({
  gender,
  role,
}: GetChristianServiceProps) => {
  const christianRepository = appDataSource.getRepository('christians');
  let cacheKey = '';

  if (!gender && !role) {
    cacheKey = 'getChristiansService';
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const christians = await christianRepository.find();

    await redis.set(cacheKey, JSON.stringify(christians));

    return christians;
  }

  if (gender && role) {
    cacheKey = `getChristiansService-${gender}-${role}`;

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const christians = await christianRepository.find({
      where: {
        gender,
        roles: '["' + role + '"]',
      },
    });

    await redis.set(cacheKey, JSON.stringify(christians));

    return christians;
  }

  if (!gender && role) {
    cacheKey = `getChristiansService-${role}`;

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const christians = await christianRepository.find({
      where: {
        roles: '["' + role + '"]',
      },
    });

    await redis.set(cacheKey, JSON.stringify(christians));

    return christians;
  }
  if (gender && !role) {
    cacheKey = `getChristiansService-${gender}`;

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const christians = await christianRepository.find({
      where: {
        gender,
      },
    });

    await redis.set(cacheKey, JSON.stringify(christians));

    return christians;
  }
};
