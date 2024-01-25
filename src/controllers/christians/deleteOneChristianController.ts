import { Request, Response } from 'express';
import { deleteOneChristianService } from '../../services/christians/deleteOneChristianService';

export const deleteOneChristianController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await deleteOneChristianService(id);

  res.status(200).json({
    message: 'Christian deleted successfully',
  });
};
