import jwt from 'jsonwebtoken';
import { Service, Container, Inject } from 'typedi';
import { JWT_SECRET } from '@configs/environment';
import { JWT_ALGORITHM } from '@configs/constants';
import UserModel from '@models/user.model';
import Logger from '@utils/logger';

Container.set('userModel', UserModel);

@Service()
class ServiceAuth {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('userModel') private userModel: typeof UserModel,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  public async createToken(id: string) {
    try {
      const token = await jwt.sign({ id }, JWT_SECRET, {
        algorithm: JWT_ALGORITHM,
        expiresIn: '1h',
      });

      return token;
    } catch (e) {
      Logger.error(e);
      return false;
    }
  }
}

export default Container.get(ServiceAuth);
