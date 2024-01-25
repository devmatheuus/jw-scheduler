import { Request, Response } from 'express';
import { updateOneChristianService } from '../../services/christians/updateOneChristianService';

export const updateOneChristianController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = req.body;

  console.log(data);

  await updateOneChristianService(id, data);

  res.status(204).json({
    message: 'Christian updated successfully',
  });
};
