declare namespace Express {
  export interface Request<T = Record<string, string | number | boolean>> {
    user: {
      id?: number;
      name?: string;
      email?: string;
      phone?: string;
      isVerified?: string;
      role?: string;
      roleId?: number;
    };
    body: T;
  }
}
