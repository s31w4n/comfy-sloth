import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../components';

const CartPage: React.FC = () => {
  const { cart } = useCartContext();

  if (cart.length < 1) {
    return (
      <main>
        <PageHero title="cart" />
        <Wrapper className="page">
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <PageHero title="cart" />
      <CartContent />
    </main>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  .empty {
    text-align: center;
    h2 {
      text-transform: capitalize;
    }
    a {
      margin-top: 1rem;
    }
  }
`;

export default CartPage;
