import { Request, Response } from 'express';
import { createChristianService } from '../../services/christians/createChristianService';

export const createChristianController = async (
  req: Request,
  res: Response
) => {
  const data = req.body;

  const christian = await createChristianService(data);

  res.status(201).json({ ...christian });
};
