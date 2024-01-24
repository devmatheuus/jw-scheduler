import { Router } from 'express';
import { body } from 'express-validator';

import { createChristianController } from '../controllers/christians/createChristianController';
import { getChristiansController } from '../controllers/christians/getChristiansController';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

export const christianRoutes = () => {
  router.post(
    '',
    [
      body('name')
        .isString()
        .withMessage('O nome deve ser uma string')
        .isLength({ min: 3, max: 255 })
        .withMessage('O nome deve ter entre 3 e 255 caracteres'),
      body('roles')
        .isArray()
        .withMessage('As roles devem ser um array')
        .isLength({ min: 1 })
        .withMessage('Deve ter pelo menos uma role')
        .custom((roles: string[]) => {
          const validRoles = ['anciao', 'servo', 'pioneiro', 'publicador'];
          return roles.every((role) => validRoles.includes(role));
        })
        .withMessage(
          'As roles devem ser uma das seguintes: anciao, servo, pioneiro, publicador'
        ),
      body('gender')
        .isString()
        .withMessage('O gênero deve ser uma string')
        .isIn(['male', 'female'])
        .withMessage('O gênero deve ser masculino ou feminino'),
      body('allowedToParticipate')
        .isBoolean()
        .withMessage('O allowedToParticipate deve ser um booleano')
        .optional(),
    ],
    validateRequest,
    createChristianController
  );
  router.get('', getChristiansController);

  return router;
};
