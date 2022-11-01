import Stripe from 'stripe';
import { version } from '../../package.json';
const Env = process.env.STRIPE_API_KEY as string;
export const stripe = new Stripe(Env, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'Ignews',
    version,
  },
});
