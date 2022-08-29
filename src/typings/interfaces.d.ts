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

interface CommonError {
  name: string;
  message: string;
  stack?: string;
  status?: number;
}
