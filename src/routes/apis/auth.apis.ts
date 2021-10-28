import { Request, Response, Router } from 'express';
import passport from 'passport';
import AuthService from '@services/auth.service';
import { authRequired } from '@middlewares/auth.middle';
import { AUTH_COOKIE_KEY } from '@configs/constants';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/login',
    passport.authenticate('local'),
    async (req: Request, res: Response) => {
      if (!req.user[0])
        res.status(400).json({ message: 'Cannot find user' });

      const token = await AuthService.createToken(
        req?.user[0].userId,
      );

      if (!token) {
        res.status(500).json({ message: 'Failed to sign token' });
      }

      // naming should be the same with the frontend
      res.cookie(AUTH_COOKIE_KEY, token, {
        httpOnly: false,
        secure: true,
      });
      res.status(200).json({ data: { ...req.user[0] } });
    },
  );

  route.delete(
    '/logout',
    authRequired,
    (req: Request, res: Response) => {
      res.clearCookie(AUTH_COOKIE_KEY, {
        httpOnly: false,
        secure: true,
      });
      res.status(200).json({ message: 'Successfully logout' });
    },
  );
};
