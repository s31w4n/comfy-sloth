import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  product?: {};
}

const PageHero: React.FC<Props> = ({ title, product }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
          {product && <Link to="/products">/ products</Link>} / {title}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 15vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
  h3 {
    font-size: 1.5rem;
  }
  @media (max-width: 600px) {
    h3 {
      font-size: 1rem;
    }
  }
`;

export default PageHero;
