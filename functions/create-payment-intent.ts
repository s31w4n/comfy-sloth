import { Handler } from 'netlify-lambda';
import { Stripe } from 'stripe';

require('dotenv').config();

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01',
});

const handler: Handler = async (event, context) => {
  if (event.body) {
    const { shipping_fee, total_amount } = JSON.parse(event.body);

    const calculateOrderAmount = (): number => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }

  return {
    statusCode: 200,
    body: 'Create Payment Intent!',
  };
};

export { handler };
