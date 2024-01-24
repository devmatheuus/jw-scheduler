import { Request, Response } from 'express';
import { getChristiansService } from '../../services/christians/getChristiansService';

export const getChristiansController = async (req: Request, res: Response) => {
  const christians = await getChristiansService();

  return res.status(200).json(christians);
};
