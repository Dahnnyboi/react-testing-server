import { Container, Inject, Service } from 'typedi';
import { Op } from 'sequelize';
import PostModel from '@models/post.model';

Container.set('postModel', PostModel);

@Service()
class ServicePost {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('postModel') private postModel: typeof PostModel,
  ) {}

  public async createPost(
    userId: string,
    title: string,
    message: string,
  ) {
    await this.postModel.create({ userId, title, message });
  }

  public async retrievePost(postId: string, userId: string) {
    return this.postModel.findOne({ where: { postId, userId } });
  }

  public async retrieveMultiplePost(
    userId: string,
    search?: QUERYSTRING,
    limit?: QUERYSTRING,
    offset?: QUERYSTRING,
    orderBy?: QUERYSTRING,
    order?: ('ASC' | 'DESC') & QUERYSTRING,
  ) {
    const whereOption: ANY = { userId };
    if (search) {
      whereOption.title = { [Op.startsWith]: search };
    }
    let page = 0;
    if (limit && offset) {
      page = limit * offset;
    }

    const data = await this.postModel.findAll({
      limit: limit || 20,
      offset: page,
      where: whereOption,
      order: [[orderBy || 'createdAt', order || 'DESC']],
    });

    const count = await this.postModel.count({ where: whereOption });

    const meta = {
      totalPages: Math.ceil(count / (Number(limit) || 20)),
      totalRows: count,
      limit: limit || 20,
      offset: offset || 0,
      order: order || 'DESC',
      orderBy: orderBy || 'createdAt',
    };

    return { data, meta };
  }

  public async updatePost(
    postId: string,
    userId: string,
    title: string,
    message: string,
  ) {
    await this.postModel.update(
      { title, message },
      { where: { postId, userId } },
    );
  }

  public async deletePost(postId: string, userId: string) {
    await this.postModel.destroy({
      where: { postId, userId },
    });
  }
}

export default Container.get(ServicePost);
