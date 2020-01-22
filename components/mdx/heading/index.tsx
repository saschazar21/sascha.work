import React from 'react';
import Link from 'next/link';
import styled from 'styled-components/macro';
import { LinkIcon } from '@saschazar/unicat-icons';

export interface HeadingProps extends HTMLHeadingElement {
  /* the h-level */
  'data-level': '1' | '2' | '3' | '4' | '5';
}

const StyledHeading = styled.h1`
  position: relative;
  margin-left: -1em;
  padding-left: 1em;

  & > a {
    display: none;
    border-bottom: none;
    position: absolute;
    top: 0;
    left: 0;
    color: hsla(var(--color-primary), 0.5);
  }

  &:hover > a {
    display: inline;
  }

  svg {
    fill: currentColor;
    height: 0.75em;
    width: 0.75em;
  }
`;

const Heading = (props: HeadingProps): JSX.Element => {
  const { children, 'data-level': level, id, ...other } = props;
  return (
    <StyledHeading as={`h${level}`} id={id} {...other}>
      {children}
      {id && (
        <Link href={`#${id}`}>
          <a aria-hidden="true">
            <LinkIcon aria-hidden="true" />
          </a>
        </Link>
      )}
    </StyledHeading>
  );
};

export default Heading;
