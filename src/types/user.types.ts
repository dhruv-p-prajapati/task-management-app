import { DefaultSession } from 'next-auth';

export enum UserRole {
  // eslint-disable-next-line no-unused-vars
  USER = 'user',
  // eslint-disable-next-line no-unused-vars
  ADMIN = 'admin',
}

export interface IUser {
  name: string;
  email?: string;
  password?: string;
  imgUrl?: string;
  role: UserRole;
}

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession['user'];
  }
}
