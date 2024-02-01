import { appDataSource } from '../../dataSource';
import { ChristianRoles } from '../../types/christian/roles';

type GetChristianServiceProps = {
  role?: ChristianRoles;
  gender?: 'female' | 'male';
};

export const getChristiansService = async ({
  gender,
  role,
}: GetChristianServiceProps) => {
  const christianRepository = appDataSource.getRepository('christians');

  if (gender && role) {
    return await christianRepository.find({
      where: {
        gender,
        roles: '["' + role + '"]',
      },
    });
  }

  if (!gender && role) {
    return await christianRepository.find({
      where: {
        roles: '["' + role + '"]',
      },
    });
  }

  return await christianRepository.find();
};
