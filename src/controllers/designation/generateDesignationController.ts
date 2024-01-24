import { Request, Response } from 'express';
import { generateDesignationService } from '../../services/designation/generateDesignationService';

export const generateDesignationController = async (
  req: Request,
  res: Response
) => {
  const { period } = req.body;

  const data = await generateDesignationService(period);

  return res.json(data);
};
