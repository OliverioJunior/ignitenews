import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { stripe } from '../../services/stripe';
export default async (res: NextApiResponse, req: NextApiRequest) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      email: session?.user?.email ? session.user.email : '',
      //metadata
    });
    session?.user;
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
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

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
