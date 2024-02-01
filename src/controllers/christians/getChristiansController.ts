import { Request, Response } from 'express';
import { getChristiansService } from '../../services/christians/getChristiansService';
import { ChristianRoles } from '../../types/christian/roles';

export const getChristiansController = async (req: Request, res: Response) => {
  const role = req.query?.role as ChristianRoles;
  const gender = req.query?.gender as 'female' | 'male';

  const christians = await getChristiansService({ role, gender });

  return res.status(200).json(christians);
};
