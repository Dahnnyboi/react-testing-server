declare namespace Express {
  interface Request {
    user: {
      [index: number]: { userId: string };
    };
    payload: {
      id: string;
      iat: number;
    };
  }
}
