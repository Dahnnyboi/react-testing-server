interface PostAttributes {
  postId: string;
  userId: string;
  title: string;
  message: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
