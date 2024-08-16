import { DefaultSession } from 'next-auth';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUser {
  name: string;
  email?: string;
  password?: string;
  imgUrl?: string;
  role: UserRole;
  bio: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserRole;
      id: string;
    } & DefaultSession['user'];
  }
}
