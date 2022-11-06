import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import { SignInResponse, SignInOptions } from 'next-auth/react';
import GithubProvider from 'next-auth/providers/github';
interface UserProps {
  user: {
    email: string;
  };
}
import { fauna } from '../../../services/fauna';
import { AdapterUser } from 'next-auth/adapters';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID
        ? process.env.GITHUB_CLIENT_ID
        : '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET
        ? process.env.GITHUB_CLIENT_SECRET
        : '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(response: any) {
      const { user }: UserProps = response;
      const { email } = user;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email))),
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email))),
          ),
        );
        return true;
      } catch {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);
