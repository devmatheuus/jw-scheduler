import { Request, Response } from 'express';

import { getMeetingsByMonthService } from '../../services/meeting/getMeetingsByMonthService';

export const getMeetingsByMonthController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getMeetingsByMonthService();

    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
