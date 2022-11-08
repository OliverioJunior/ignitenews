import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { stripe } from '../../services/stripe';
import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

type Data = {
  sessionId: string;
};
type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};
export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
  const session = await getSession({ req });

  const user = fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session?.user?.email ? session?.user?.email : ''),
      ),
    ),
  );

  // eslint-disable-next-line prefer-const
  let customerId = (await user).data.stripe_customer_id;

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: session?.user?.email ? session.user.email : '',
      //metadata
    });
    await fauna.query(
      q.Update(q.Ref(q.Collection('users'), (await user).ref.id), {
        data: { stripe_customer_id: stripeCustomer.id },
      }),
    );
    customerId = stripeCustomer.id;
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [{ price: 'price_1Lz6M0HOKwH0vkwQvoxyYZJ1', quantity: 1 }],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL
      ? process.env.STRIPE_SUCCESS_URL
      : '',
    cancel_url: process.env.STRIPE_CANCEL_URL
      ? process.env.STRIPE_CANCEL_URL
      : '',
  });
  const sessionId = stripeCheckoutSession.id;

  return res.status(200).json({ sessionId });
}
