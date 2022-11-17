import { query as q } from 'faunadb';
import NextAuth, { Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GithubProvider from 'next-auth/providers/github';
interface UserProps {
  user: {
    email: string;
  };
}
import { fauna } from '../../../services/fauna';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session(session: any) {
      // console.log(session.session.user.email);
      try {
        const userActiveSubscription = await fauna.query<string>(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.session.user.email),
                    ),
                  ),
                ),
              ),
              q.Match(q.Index('subscription_by_status'), 'active'),
            ]),
          ),
        );
        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch (err) {
        console.log(err);
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
