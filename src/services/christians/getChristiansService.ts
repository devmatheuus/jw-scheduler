import { appDataSource } from '../../dataSource';

export const getChristiansService = async () => {
  const christianRepository = appDataSource.getRepository('christians');

  const christians = await christianRepository.find();

  return christians;
};
