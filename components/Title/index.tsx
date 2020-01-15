import React from 'react';
import styled from 'styled-components/macro';

const Header = styled.h1`
  color: inherit;
  text-align: center;
  margin-top: 2rem;

  @media screen and (min-width: 768px) {
    margin-top: 4rem;
  }
`;

export interface TitleProps {
  children: string;
}

const Title = (props: TitleProps): JSX.Element => {
  return <Header>{props.children}</Header>;
};

export default Title;
