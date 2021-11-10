import { Container, Inject, Service } from 'typedi';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@configs/constants';
import UserModel from '@models/user.model';

Container.set('userModel', UserModel);

@Service()
class ServiceUser {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('userModel') private userModel: typeof UserModel,
  ) {}

  public async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(password, salt);

    await this.userModel.create({
      firstName,
      lastName,
      email,
      salt,
      password: hashPassword,
    });
  }

  public async findUserByEmailAndPass(
    email: string,
    password: string,
  ) {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      return false;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return false;
    }

    return user;
  }

  public async findUserById(id: string) {
    const user = await this.userModel.findOne({
      where: { userId: id },
    });

    if (!user) {
      return false;
    }

    return user;
  }
}

export default Container.get(ServiceUser);
