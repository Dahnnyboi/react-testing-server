import { Service } from 'typedi';
import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelizeInstance from '@loaders/sequelize';

@Service()
class UserModel extends Model {}

UserModel.init(
  {
    userId: {
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'users',
    timestamps: true,
  },
);

export default UserModel;
