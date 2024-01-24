import { Router } from 'express';
import { generateDesignationController } from '../controllers/designation/generateDesignationController';
import { validateRequest } from '../middlewares/validateRequest';
import { body } from 'express-validator';

const router = Router();

export const designationRoutes = () => {
  router.post(
    '',
    [
      body('period')
        .isString()
        .withMessage(
          'O período deve ser uma string. Ex: 1-07-de-janeiro-de-2024, 29-de-janeiro-4-de-fevereiro-de-2024'
        ),
    ],
    validateRequest,
    generateDesignationController
  );

  return router;
};
