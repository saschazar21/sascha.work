import React, { ReactChild } from 'react';
import styled from 'styled-components/macro';

const FullBleedElement = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  padding: 2rem;
  overflow: hidden;
  background: ${({ 'data-color': color }: FullBleedProps): string =>
    color
      ? `linear-gradient(to bottom, HSLA(var(--color-bg-secondary), 0.75), HSLA(var(--color-bg-secondary), 0.95)) HSL(var(--color-${color}))`
      : 'inherit'};

  @media screen and (min-width: 768px) {
    padding: 4rem;
  }
`;

export interface FullBleedProps {
  /* the children */
  children: ReactChild | ReactChild[];
  /* custom className */
  className?: string;
  /* custom background color */
  'data-color'?: string;
}

const FullBleed = (props: FullBleedProps): JSX.Element => {
  const { children, ...other } = props;
  return <FullBleedElement {...other}>{children}</FullBleedElement>;
};

export default FullBleed;
