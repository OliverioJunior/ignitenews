import { fauna } from '../../../services/fauna';
import { query as q } from 'faunadb';
import { stripe } from '../../../services/stripe';
export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createdAction = false,
) {
  const useRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)),
    ),
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  console.log(subscription.status);
  const subscriptionData = {
    id: subscription.id,
    userId: useRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };
  if (createdAction) {
    console.log('create');
    await fauna.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData }),
    );
  } else {
    console.log('update');
    try {
      await fauna.query(
        q.Replace(
          q.Select(
            'ref',
            q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)),
          ),
          { data: subscriptionData },
        ),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  }
}
