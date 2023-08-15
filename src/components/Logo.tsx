import React from 'react';
import styled from 'styled-components';

const Logo: React.FC = () => {
  return (
    <Wrapper>
      <span>Comfy</span>Sloth
    </Wrapper>
  );
};

const Wrapper = styled.h3`
  font-family: 'Array', sans-serif;
  margin-bottom: 0;
  color: var(--clr-grey-1);
  span {
    color: var(--clr-primary-5);
  }
`;

export default Logo;
