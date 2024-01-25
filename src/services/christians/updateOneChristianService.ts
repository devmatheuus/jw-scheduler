import { appDataSource } from '../../dataSource';
import { NotFoundError } from '../../errors/NotFoundError';
import { UpdateChristian } from '../../types/christian/createChristian';
import { stringifyData } from '../../utils/stringifyData';

export const updateOneChristianService = async (
  id: string,
  christianData: UpdateChristian
) => {
  const christianRepository = appDataSource.getRepository('christians');

  const christian = await christianRepository.findOne({ where: { id } });

  if (!christian) throw new NotFoundError('Christian not found');

  if (christianData.dateOfLastPart) {
    christian.lastPartMilliseconds = new Date(
      christianData.dateOfLastPart
    ).getTime();
  }

  const data = stringifyData(christianData);

  await christianRepository.update(id, { ...data });
};
