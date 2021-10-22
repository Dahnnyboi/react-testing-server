import { IS_DEVELOPMENT } from './environment';

export const PORT = 4000;
export const ENVIRONMENT = IS_DEVELOPMENT
  ? 'development'
  : 'production';
export const SALT_ROUNDS = 10;
export const API_PREFIX = '/api/v1';
export const JWT_ALGORITHM = 'HS256';
export const AUTH_COOKIE_KEY = 'react-testing-cookie';
