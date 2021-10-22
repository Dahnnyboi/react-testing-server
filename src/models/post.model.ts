import { Service } from 'typedi';
import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelizeInstance from '@loaders/sequelize';
import UserModel from './user.model';

@Service()
class PostModel extends Model {
  public postId!: string;

  public userId!: string;

  public title!: string;

  public message!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

PostModel.init(
  {
    postId: {
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'posts',
    timestamps: true,
  },
);

PostModel.belongsTo(UserModel, { foreignKey: 'userId' });

export default PostModel;
