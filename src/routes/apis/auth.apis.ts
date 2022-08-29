import { Request, Response, Router } from 'express';
import passport from 'passport';
import UserService from '@services/user.service';
import AuthService from '@services/auth.service';
import authMiddleware from '@middlewares/auth.middle';
// import { AUTH_COOKIE_KEY } from '@configs/constants';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/login',
    passport.authenticate('local'),
    async (req: Request, res: Response) => {
      if (!req.user)
        res.status(400).json({ message: 'Cannot find user' });

      const token = await AuthService.createToken(req?.user.userId);

      if (!token) {
        res.status(500).json({ message: 'Failed to sign token' });
      }

      // naming should be the same with the frontend
      // res.cookie(AUTH_COOKIE_KEY, token, {
      //   httpOnly: false,
      //   secure: false,
      // });
      res.status(200).json({ data: { ...req.user, token } });
    },
  );

  route.get(
    '/refresh',
    authMiddleware,
    async (req: Request, res: Response) => {
      if (!req.payload.id)
        res.status(400).json({ message: 'Failed to refresh token' });

      const user = await UserService.findUserById(req.payload.id);
      const token = await AuthService.createToken(req.payload.id);
      res.status(200).json({ data: { ...user, token } });
    },
  );

  route.delete(
    '/logout',
    authMiddleware,
    (req: Request, res: Response) => {
      // res.clearCookie(AUTH_COOKIE_KEY, {
      //   httpOnly: false,
      //   secure: false,
      // });
      res.status(200).json({ message: 'Successfully logout' });
    },
  );
};
