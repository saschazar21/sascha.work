import React, { Component, ReactChild } from 'react';
import styled from 'styled-components';
import { ScissorsIcon } from '@saschazar/unicat-icons';

export interface ErrorProps {
  /* children to render without error */
  children: ReactChild | ReactChild[];
  /* message to display when error occurred */
  'data-msg'?: string;
}

export interface ErrorState {
  error?: string;
  hasError: boolean;
}

const Scissors = styled(ScissorsIcon)`
  display: block;
  position: absolute;
  fill: HSL(var(--color-accent));
  height: 1em;
  width: 1em;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) rotateZ(90deg);
`;

const ErrorBox = styled.div`
  position: relative;
  border: 4px dashed HSL(var(--color-accent));
  text-align: center;
  padding: 1rem 2rem;
  margin: 1rem;
`;

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
  };

  static getDerivedStateFromError(error): ErrorState {
    return { error: error.message || error, hasError: true };
  }

  public render(): ReactChild | ReactChild[] | JSX.Element {
    const { children, 'data-msg': msg } = this.props;
    const { error, hasError } = this.state;

    if (hasError) {
      return (
        <ErrorBox>
          <strong>{msg}</strong>
          <br />
          {error && <code>{error}</code>}
          <Scissors />
        </ErrorBox>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
