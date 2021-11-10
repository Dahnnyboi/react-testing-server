import { Request, Response, NextFunction } from 'express';
import expressJwt from 'express-jwt';
import { JWT_SECRET } from '@configs/environment';
import { JWT_ALGORITHM } from '@configs/constants';
import Logger from '@utils/logger';

// function getTokenFromCookie(req: Request) {
//   if (req.cookies[AUTH_COOKIE_KEY])
//     return req.cookies[AUTH_COOKIE_KEY];

//   return null;
// }
function getTokenFromHeader(req: Request) {
  if (req.headers.authorization) {
    // bearer tokenName
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

export const authRequired = expressJwt({
  secret: JWT_SECRET,
  userProperty: 'payload',
  getToken: getTokenFromHeader,
  algorithms: [JWT_ALGORITHM],
});

export function checkPayload(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.payload.id) {
    Logger.error('User id is required in this request');
    next({
      message: 'User id is required in this request',
      status: 400,
    });
  }

  next();
}
