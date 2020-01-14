import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Header = styled.h1`
  animation: ${rotate} 1s ease-in;
  color: rgb(var(--color-green));
  text-align: center;
`;

export interface TitleProps {
  children: string;
}

const Title = (props: TitleProps): JSX.Element => {
  return <Header>{props.children}</Header>;
};

export default Title;
