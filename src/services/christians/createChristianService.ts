import { appDataSource } from '../../dataSource';
import { Christians } from '../../models/Christians';
import { CreateChristian } from '../../types/christian/createChristian';
import { stringifyData } from '../../utils/stringifyData';

export const createChristianService = async (
  christian: CreateChristian
): Promise<Christians> => {
  const christianRepository = appDataSource.getRepository('christians');

  const data = stringifyData(christian);

  const newChristian = christianRepository.create(data);

  await christianRepository.save(newChristian);

  return newChristian as Christians;
};
