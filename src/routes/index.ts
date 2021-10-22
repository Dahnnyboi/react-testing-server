import { Router } from 'express';
import users from './apis/user.apis';
import auth from './apis/auth.apis';
import post from './apis/post.apis';

export default (): Router => {
  const app = Router();
  users(app);
  auth(app);
  post(app);

  return app;
};
