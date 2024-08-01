import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { mongoInit } from '../db/dbConfig';
import User from '@/models/user.model';
import { IAPIResponse } from '@/types/APIResponse.types';
import { EndPoints } from '@/types/endpoints.types';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day in seconds
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 1 day in seconds
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        name: {
          label: 'name',
          type: 'text',
          placeholder: 'Enter name',
        },
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password',
        },
        endPoint: {
          label: 'Endpoint',
          type: 'hidden',
          placeholder: 'Endpoint',
        },
      },
      async authorize(credentials): Promise<any> {
        await mongoInit();

        if (credentials?.endPoint === EndPoints.REGISTER) {
          const res = await fetch(
            `${process.env.NEXT_BASE_URL}/api/${EndPoints.REGISTER}`,
            {
              method: 'POST',
              body: JSON.stringify({
                name: credentials?.name,
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { 'Content-Type': 'application/json' },
            },
          );

          const apiResponse: IAPIResponse = await res.json();

          if (!apiResponse.success) {
            throw new Error(apiResponse.message);
          }

          return apiResponse.data;
        }

        if (credentials?.endPoint === EndPoints.LOGIN) {
          const res = await fetch(
            `${process.env.NEXT_BASE_URL}/api/${EndPoints.LOGIN}`,
            {
              method: 'POST',
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { 'Content-Type': 'application/json' },
            },
          );

          const apiResponse: IAPIResponse = await res.json();

          if (!apiResponse.success) {
            throw new Error(apiResponse.message);
          }

          return apiResponse.data;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider == 'google') {
        await mongoInit();
        const existedUser = await User.findOne({ email: user.email });
        if (!existedUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            imgUrl: user.image,
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token }) {
      const user = await User.findOne({ email: token.email });
      token.role = user?.role;

      return token;
    },
    async session({ session, token }: any) {
      session.user.role = token.role;
      return session;
    },
  },
};
