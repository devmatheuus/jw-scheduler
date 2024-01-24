import { Request, Response } from 'express';
import { generateMeetingDataService } from '../../services/meeting/generateMeetingDataService';

export const generateMeetingDataController = async (
  req: Request,
  res: Response
) => {
  const { url } = req.body;

  await generateMeetingDataService(url);

  res.status(200).json({ message: 'Meeting data generated successfully' });
};
