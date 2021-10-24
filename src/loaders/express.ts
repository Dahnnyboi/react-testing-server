import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from 'express';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import routes from '@routes';
import { API_PREFIX } from '@configs/constants';
import UserService from '@services/user.service';
import passport from 'passport';
import * as passportLocal from 'passport-local';
import Logger from '@utils/logger';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

const LocalStrategy = passportLocal.Strategy;

export default (app: Application): void => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id: string, done) => {
    const result = await UserService.findUserById(id);
    if (result) done(null, result);
    done(false);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      async (username: string, password: string, done) => {
        try {
          const result = await UserService.findUserByEmailAndPass(
            username,
            password,
          );
          if (!result) return done(null, false);

          return done(null, result);
        } catch (e) {
          Logger.error(e);
          return done(null, false);
        }
      },
    ),
  );

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());
  app.use(limiter);
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(cors(corsOptions));

  app.use(API_PREFIX, routes());

  app.use(API_PREFIX, (req: Request, res: Response) => {
    res
      .status(200)
      .json({ message: 'Welcome to React Testing Server' });
  });

  app.use((req, res, next) => {
    const err = new Error('API routes is not found or Server Error');
    next(err);
  });

  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === 'UnauthorizedError') {
        return res.status(403).send({ message: err.message }).end();
      }
      return next(err);
    },
  );

  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    },
  );
};
