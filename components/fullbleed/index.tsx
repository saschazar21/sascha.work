import React, { ReactChild } from 'react';
import styled from 'styled-components/macro';

const FullBleedElement = styled.div`
  position: relative;
  width: 100vw;
  padding: 2rem;
  margin-left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  background: ${({ 'data-color': color }: FullBleedProps): string =>
    color
      ? `linear-gradient(to bottom, HSLA(var(--color-bg-primary), 0.45), HSLA(var(--color-bg-primary), 0.6)) HSL(var(--color-${color}))`
      : 'inherit'};

  @media screen and (min-width: 768px) {
    min-height: initial;
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
