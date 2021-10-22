import dotenv from 'dotenv';

dotenv.config();

// all the development are stored locally
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const DATABASE_HOST = IS_DEVELOPMENT
  ? 'localhost'
  : process.env.DATABASE_HOST;
export const DATABASE_NAME = IS_DEVELOPMENT
  ? 'testing'
  : process.env.DATABASE_NAME;
export const DATABASE_USER = IS_DEVELOPMENT
  ? 'postgres'
  : process.env.DATABASE_USER;
export const DATABASE_PASSWORD = IS_DEVELOPMENT
  ? 'password'
  : process.env.DATABASE_PASSWORD;
export const PORT = process.env.PORT || '4000';

export const JWT_SECRET = process.env.JWT_PRIVATE_KEY || 'jwt_secret';
