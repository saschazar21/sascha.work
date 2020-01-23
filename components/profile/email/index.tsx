import React from 'react';
import styled from 'styled-components/macro';
import { KeyIcon } from '@saschazar/unicat-icons';

const PGPSection = styled.p`
  position: relative;
  padding: 1rem;
  border: 2px dashed HSLA(var(--color-secondary), 0.5);
`;

const PGPIcon = styled(KeyIcon)`
  fill: currentColor;
  height: 1em;
  width: 1em;
  margin-right: 0.5em;
`;

const PGPLink = styled.a`
  transition: border-color 200ms ease-in, background 200ms ease-in,
    color 200ms ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid HSLA(var(--color-secondary), 0.5);
  color: HSL(var(--color-secondary));
  padding: 0.5em;
  margin-bottom: 1rem;

  &:focus,
  &:hover,
  &:visited {
    color: HSL(var(--color-secondary));
    text-decoration: none;
  }

  &:hover {
    background: HSL(var(--color-secondary));
    color: HSL(var(--color-bg-primary));
    border-color: HSL(var(--color-secondary));
  }
`;

const EmailSection = (): JSX.Element => {
  return (
    <PGPSection>
      <PGPLink
        href="https://keyserver.ubuntu.com/pks/lookup?search=sascha.zarhuber&op=get"
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        <PGPIcon aria-hidden="true" />
        <span>Download PGP Key</span>
      </PGPLink>
      Use my PGP public key to send me secure e-mails.
    </PGPSection>
  );
};

export default EmailSection;
