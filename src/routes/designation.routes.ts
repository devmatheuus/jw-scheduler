import { Router } from 'express';
import { generateDesignationController } from '../controllers/designation/generateDesignationController';

const router = Router();

export const designationRoutes = () => {
  router.post('', generateDesignationController);

  return router;
};
