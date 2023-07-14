import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../context/user_context';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';

const CheckoutSuccess: React.FC = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { myUser } = useUserContext();
  const { clearCart } = useCartContext();

  useEffect(() => {
    const countdownTimer = setTimeout(() => {
      clearCart();
      navigate('/'); // Navigate to the home page after 5 seconds
    }, 5000);

    return () => clearTimeout(countdownTimer); // Clear the timer if the component unmounts before the countdown completes
    // eslint-disable-next-line
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1); // Update the countdown every second
    }, 1000);

    return () => clearInterval(timer); // Clear the timer if the component unmounts
  }, []);

  return (
    <Wrapper className="page-100">
      <article>
        <h5 className="content">
          Thank you, {''}
          <span>{myUser && myUser.name}</span>
        </h5>
        <h5>Your payment was successful!</h5>
        <h5>Redirecting to the home page in {countdown} seconds!</h5>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  article {
    padding: 1rem;
    margin: 2rem;
    border: 1px solid #eee;
    border-radius: var(--radius);
    background-color: var(--clr-primary-5);
    color: var(--clr-primary-10);
  }
  span {
    font-family: 'Array', sans-serif;
  }
`;

export default CheckoutSuccess;
