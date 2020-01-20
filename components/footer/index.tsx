import React from 'react';
import styled from 'styled-components/macro';

import GPGLink from 'components/profile/email';
import Social from 'components/profile/social';

const FooterWrapper = styled.footer`
  display: grid;
  margin: -2rem;
  min-width: 0;
  min-height: 0;
  grid-template-areas:
    'nav'
    'about'
    'social'
    'email';
  grid-template-columns: 1fr;
  row-gap: 0;
  column-gap: 0;

  > * {
    padding: 2rem;
  }

  @media screen and (min-width: 768px) {
    grid-template-areas:
      'nav about'
      'social email';
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: calc(900px + 6rem)) {
    max-width: calc(900px + 4rem);
    margin: -2rem auto;
  }

  @media screen and (min-width: 1200px) {
    grid-template-areas: 'nav about social' 'email';
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SocialWrapper = styled.aside`
  grid-area: social;

  @media screen and (min-width: 1200px) {
    border-left: 0.5px solid hsla(var(--color-grey), 0.2);
  }
`;

const EmailWrapper = styled.aside`
  grid-area: email;

  @media screen and (min-width: 768px) {
    border-left: 0.5px solid hsla(var(--color-grey), 0.2);
  }

  @media screen and (min-width: 1200px) {
    border-left: none;
  }
`;

const FooterHeading = styled.h2`
  font-size: 1.125em;
`;

const Footer = (): JSX.Element => {
  return (
    <FooterWrapper>
      <SocialWrapper>
        <FooterHeading>Social Media</FooterHeading>
        <Social />
      </SocialWrapper>
      <EmailWrapper>
        <FooterHeading>Secure E-Mail</FooterHeading>
        <GPGLink />
      </EmailWrapper>
    </FooterWrapper>
  );
};

export default Footer;
