import { Request, Response } from 'express';
import { getMeetingDataService } from '../../services/meeting/getMeetingDataService';

export const getMeetingDataController = async (req: Request, res: Response) => {
  const meetingData = await getMeetingDataService();

  res.status(200).json(meetingData);
};
