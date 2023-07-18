import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';

type Props = {
  clientSecret: string;
};

const CheckoutForm: React.FC<Props> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements()!;

  const { total_amount } = useCartContext();
  const { myUser } = useUserContext();

  const [succeeded, setSucceeded] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean | null>(false);
  const [disabled, setDisabled] = useState<boolean | null>(true);

  const handleChange = async (event: StripePaymentElementChangeEvent) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty as boolean);
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setProcessing(true);

    const { error } = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page (development & deployment)
        // return_url: 'http://localhost:8888/checkout/success',
        return_url: 'https://comfy-zone-ts.vercel.app/checkout/success',
      },
    });

    if (error) {
      setError(`Payment failed ${error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <article>
          <h4>
            Hello, <span>{myUser && myUser.name}</span>
          </h4>
          <p>
            Your total is{' '}
            <span className="price">{formatPrice(total_amount)}</span>
          </p>
          <p>Test Card Number: 4242 4242 4242 4242</p>
        </article>
        <PaymentElement
          id="payment-element"
          onChange={(e) => handleChange(e)}
        />
        <button disabled={processing || disabled || succeeded!} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
