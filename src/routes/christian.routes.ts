import { Router } from 'express';
import { body, param } from 'express-validator';

import { createChristianController } from '../controllers/christians/createChristianController';
import { getChristiansController } from '../controllers/christians/getChristiansController';
import { validateRequest } from '../middlewares/validateRequest';
import { getOneChristianController } from '../controllers/christians/getOneChristianController';
import { deleteOneChristianController } from '../controllers/christians/deleteOneChristianController';
import { updateOneChristianController } from '../controllers/christians/updateOneChristianController';
import { sanitizeData } from '../middlewares/sanitizeData';

const isArrayOfTypeCurrentResponsibility = (value: any[]): boolean => {
  return value.every((item) => {
    return (
      typeof item === 'object' &&
      item !== null &&
      typeof item.name === 'string' &&
      item.date !== ''
    );
  });
};

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
    sanitizeData,
    validateRequest,
    createChristianController
  );
  router.get(
    '',
    [
      param('role')
        .isIn(['anciao', 'servo', 'pioneiro', 'publicador'])
        .withMessage(
          'A role deve ser uma das seguintes: anciao, servo, pioneiro, publicador'
        )
        .optional(),
      param('gender')
        .isIn(['female', 'male'])
        .withMessage('O gênero deve ser masculino ou feminino')
        .optional(),
    ],
    validateRequest,
    getChristiansController
  );
  router.get(
    '/:id',
    [param('id').isUUID().withMessage('O id deve ser um UUID')],
    validateRequest,
    getOneChristianController
  );
  router.delete(
    '/:id',
    [param('id').isUUID().withMessage('O id deve ser um UUID')],
    validateRequest,
    deleteOneChristianController
  );

  router.patch(
    '/:id',
    [
      param('id').isUUID().withMessage('O id deve ser um UUID'),
      body('name')
        .isString()
        .withMessage('O nome deve ser uma string')
        .isLength({ min: 3, max: 255 })
        .withMessage('O nome deve ter entre 3 e 255 caracteres')
        .optional(),
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
        )
        .optional(),
      body('gender')
        .isString()
        .withMessage('O gênero deve ser uma string')
        .isIn(['male', 'female'])
        .withMessage('O gênero deve ser masculino ou feminino')
        .optional(),
      body('allowedToParticipate')
        .isBoolean()
        .withMessage('O allowedToParticipate deve ser um booleano')
        .optional(),
      body('dateOfLastPart')
        .isDate()
        .withMessage('A data da última participação deve ser uma data')
        .optional(),
      body('currentResponsibilities')
        .isArray()
        .withMessage('As responsabilidades atuais devem ser um array')
        .custom(isArrayOfTypeCurrentResponsibility)
        .optional(),
      body('lastPersonParticipatedName')
        .isString()
        .withMessage(
          'O nome da última pessoa que participou deve ser uma string'
        )
        .optional(),
    ],
    sanitizeData,
    validateRequest,
    updateOneChristianController
  );

  return router;
};
