import { NextFunction, Request, Response, Router } from 'express';
import UserService from '@services/user.service';
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
};
