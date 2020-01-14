import React, { ReactChild } from 'react';
import styled from 'styled-components/macro';

const FullBleedElement = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  padding: 4rem;
  overflow: hidden;
  background: inherit;
`;

export interface FullBleedProps {
  /* the children */
  children: ReactChild | ReactChild[];
  /* custom className */
  className?: string;
}

const FullBleed = (props: FullBleedProps): JSX.Element => {
  const { children, ...other } = props;
  return <FullBleedElement {...other}>{children}</FullBleedElement>;
};

export default FullBleed;
