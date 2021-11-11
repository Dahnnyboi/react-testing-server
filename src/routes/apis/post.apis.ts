import { Request, Response, Router, NextFunction } from 'express';
import PostService from '@services/post.service';
import Logger from '@utils/logger';
import { authRequired, checkPayload } from '@middlewares/auth.middle';

const route = Router();

export default (app: Router): void => {
  app.use('/post', route);

  route.post(
    '/',
    authRequired,
    checkPayload,
    (req: Request, res: Response, next: NextFunction) => {
      const { id: userId } = req.payload;
      const { title, message } = req.body;
      try {
        PostService.createPost(userId, title, message);

        res
          .status(200)
          .json({ message: 'Successfully created a Post' });
      } catch (e) {
        Logger.error(e);
        next(e);
      }
    },
  );

  route.get(
    '/:postId',
    authRequired,
    checkPayload,
    async (req: Request, res: Response, next: NextFunction) => {
      const { postId: id } = req.params;
      const { id: userId } = req.payload;

      try {
        const post = await PostService.retrievePost(id, userId);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        const { postId, title, message, createdAt, updatedAt } = post;
        res
          .status(200)
          .json({ postId, title, message, createdAt, updatedAt });
        res.status(200);
      } catch (e) {
        Logger.error(e);
        next(e);
      }
    },
  );

  route.get(
    '/',
    authRequired,
    checkPayload,
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId } = req.payload;
      const { search, limit, offset, orderBy, order } = req.query;
      try {
        const { data, meta } = await PostService.retrieveMultiplePost(
          userId,
          search,
          limit,
          offset,
          orderBy,
          order,
        );

        res.status(200).json({
          data,
          meta,
        });
      } catch (e) {
        Logger.error(e);
        next(e);
      }
    },
  );

  route.put(
    '/:postId',
    authRequired,
    checkPayload,
    async (req: Request, res: Response, next: NextFunction) => {
      const { postId } = req.params;
      const { id: userId } = req.payload;
      const { title, message } = req.body;

      try {
        const post = await PostService.retrievePost(postId, userId);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        await PostService.updatePost(postId, userId, title, message);

        res
          .status(200)
          .json({ message: 'Successfully updated a post' });
      } catch (e) {
        Logger.error(e);
        next(e);
      }
    },
  );

  route.delete(
    '/:postId',
    authRequired,
    checkPayload,
    async (req: Request, res: Response, next: NextFunction) => {
      const { postId } = req.params;
      const { id: userId } = req.payload;

      try {
        const post = await PostService.retrievePost(postId, userId);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          return;
        }

        await PostService.deletePost(postId, userId);
        res
          .status(200)
          .json({ message: 'Successfully deleted a Post' });
      } catch (e) {
        Logger.error(e);
        next(e);
      }
    },
  );
};
