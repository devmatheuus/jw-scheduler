import { Router } from 'express';
import { createChristianController } from '../controllers/christians/createChristianController';
import { getChristiansController } from '../controllers/christians/getChristiansController';

const router = Router();

export const christianRoutes = () => {
  router.post('', createChristianController);
  router.get('', getChristiansController);

  return router;
};
