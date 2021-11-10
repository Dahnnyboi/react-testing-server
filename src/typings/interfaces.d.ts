declare namespace Express {
  interface Request {
    user: {
      userId: string;
    };
    payload: {
      id: string;
      iat: number;
    };
  }
}
