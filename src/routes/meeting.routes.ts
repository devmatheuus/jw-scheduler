import { Router } from 'express';
import { generateMeetingDataController } from '../controllers/meeting/generateMeetingDataController';
import { getMeetingDataController } from '../controllers/meeting/getMeetingDataController';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

export const meetingRoutes = () => {
  router.post(
    '/generate',
    [
      body('url')
        .isString()
        .withMessage('A url deve ser uma string')
        .isURL()
        .withMessage('A url deve ser uma url válida'),
    ],
    validateRequest,
    generateMeetingDataController
  );
  router.get('', getMeetingDataController);

  return router;
};
