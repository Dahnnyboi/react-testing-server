interface PostAttributes {
  postId: string;
  userId: string;
  title: string;
  message: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

interface UserChangeableAttributes {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
