import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
  color: inherit;
  text-align: center;
  margin-top: 2rem;
  text-shadow: ${[1, 2, 3, 4]
      .map(val => `0 ${val}px 0 hsla(var(--color-primary), 0.15)`)
      .join(',')},
    0 5px 7px hsla(var(--color-grey), 0.5);

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
