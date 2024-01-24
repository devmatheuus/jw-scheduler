import { Request, Response } from 'express';
import { createChristianService } from '../../services/christians/createChristianService';

export const createChristianController = async (
  req: Request,
  res: Response
) => {
  const { name, roles, gender } = req.body;

  const christian = await createChristianService({ gender, name, roles });

  res.status(201).json({ ...christian });
};
