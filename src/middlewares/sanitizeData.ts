import { Request, Response, NextFunction } from 'express';

export const sanitizeData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const requestType = req.method;

  const allowedPostFields = ['name', 'roles', 'gender'];
  const allowedPatchFields = [
    'name',
    'roles',
    'gender',
    'dateOfLastPart',
    'currentResponsibilities',
    'allowedToParticipate',
    'lastPartMilliseconds',
    'lastPersonParticipatedName',
  ];

  const allowedFields =
    requestType === 'POST' ? allowedPostFields : allowedPatchFields;

  const sanitizedData = Object.keys(body).reduce((acc: any, key: any) => {
    if (allowedFields.includes(key)) {
      acc[key] = body[key];
    }

    return acc;
  }, {});

  req.body = sanitizedData;

  next();
};
