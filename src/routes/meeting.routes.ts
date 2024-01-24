import { Router } from 'express';
import { generateMeetingDataController } from '../controllers/meeting/generateMeetingDataController';
import { getMeetingDataController } from '../controllers/meeting/getMeetingDataController';

const router = Router();

export const meetingRoutes = () => {
  router.post('/generate', generateMeetingDataController);
  router.get('', getMeetingDataController);

  return router;
};
