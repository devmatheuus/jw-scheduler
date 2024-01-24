import { appDataSource } from '../../dataSource';
import { Christians } from '../../models/Christians';
import { CreateChristian } from '../../types/christian/createChristian';

export const createChristianService = async (
  christian: CreateChristian
): Promise<Christians> => {
  const christianRepository = appDataSource.getRepository('christians');

  const newChristian = christianRepository.create(christian);

  await christianRepository.save(newChristian);

  return newChristian as Christians;
};
