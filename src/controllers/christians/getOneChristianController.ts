import { Request, Response } from 'express';
import { getOneChristianService } from '../../services/christians/getOneChristianService';

export const getOneChristianController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const christian = await getOneChristianService(id);

  res.status(200).json(christian);
};
