import { UpdateChristian } from '../types/christian/createChristian';

export const stringifyData = (data: UpdateChristian) => {
  const roles = data.roles ?? [];
  const currentResponsibilities = data.currentResponsibilities ?? [];

  return {
    ...data,
    roles: JSON.stringify(roles),
    currentResponsibilities: JSON.stringify(currentResponsibilities),
  };
};
