import { appDataSource } from '../../dataSource';
import { NotFoundError } from '../../errors/NotFoundError';

export const getOneChristianService = async (id: string) => {
  const christianRepository = appDataSource.getRepository('christians');

  const christian = await christianRepository.findOne({ where: { id } });

  if (!christian) throw new NotFoundError('Christian not found');

  return christian;
};
