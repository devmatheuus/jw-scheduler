import { christianRoutes } from './christian.routes';
import { designationRoutes } from './designation.routes';
import { meetingRoutes } from './meeting.routes';
import { Express } from 'express';

export const appRoutes = (app: Express) => {
  app.use('/api/meetings', meetingRoutes());
  app.use('/api/christians', christianRoutes());
  app.use('/api/designations', designationRoutes());
};
