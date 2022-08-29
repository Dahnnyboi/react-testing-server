import { NextFunction, Request, Response, Router } from 'express';
import UserService from '@services/user.service';
import authMiddleware from '@middlewares/auth.middle';
import AuthService from '@services/auth.service';
import Logger from '@utils/logger';

const route = Router();

export default (app: Router): void => {
  app.use('/user', route);

  route.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, email, password } = req.body;

      try {
        await UserService.createUser(
          firstName,
          lastName,
          email,
          password,
        );

        res
          .status(200)
          .json({ message: 'Successfully created a User' });
      } catch (e) {
        Logger.error(e);
        next(e);
      }
    },
  );

  route.put(
    '/',
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, email } = req.body;
      const { id } = req.payload;

      try {
        const data: UserChangeableAttributes = {
          firstName,
          lastName,
          email,
        };
        await UserService.updateUserById(id, data);
        const user = await UserService.findUserById(id);
        // refresh token as well
        const token = await AuthService.createToken(id);

        res.status(200).json({ data: { ...user, token } });
      } catch (e) {
        Logger.error(e);
        next(e);
      }
    },
  );

  route.put(
    '/password',
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const { id } = req.payload;

      const isPasswordCorrect = await UserService.confirmUserPassword(
        id,
        oldPassword,
      );
      if (!isPasswordCorrect) {
        res
          .status(400)
          .json({ message: 'Old password is password is incorrect' });
        return;
      }

      if (newPassword !== confirmPassword) {
        res.status(400).json({
          message: 'Password and confirm password do not match',
        });
        return;
      }

      try {
        await UserService.updateUserPasswordById(id, newPassword);
        const user = await UserService.findUserById(id);
        // refresh token as well
        const token = await AuthService.createToken(id);

        res.status(200).json({ data: { ...user, token } });
      } catch (e) {
        Logger.error(e);
        next(e);
      }
    },
  );
};
