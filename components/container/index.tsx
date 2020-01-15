import React, { ReactChild } from 'react';
import styled from 'styled-components/macro';

const ContainerElement = styled.section`
  position: relative;
  background: transparent;
  max-width: 750px;
  margin: 0 auto;
`;

export interface ContainerProps {
  /* the container's children */
  children: ReactChild | ReactChild[];
  /* a custom class name */
  className?: string;
}

const Container = (props: ContainerProps): JSX.Element => {
  const { children, ...other } = props;
  return <ContainerElement {...other}>{children}</ContainerElement>;
};

export default Container;
