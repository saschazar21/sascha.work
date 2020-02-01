import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import Link from 'next/link';
import styled from 'styled-components/macro';

import GPGLink from 'components/profile/email';
import Navigation from 'components/navigation';
import Social from 'components/profile/social';

import feed from 'public/feed.json';

export interface LightSwitchProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  on?: string;
}

const FooterWrapper = styled.footer`
  display: grid;
  border-top: 0.5px solid hsla(var(--color-grey), 0.25);
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
    max-width: calc(900px + 4rem);
    margin: -2rem auto;
  }

  @media screen and (min-width: 1200px) {
    grid-template-areas:
      'nav about social'
      '. email .';
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LightSwitchWrapper = styled.div`
  padding: 0 0 4rem;
  text-align: center;
`;

const LightSwitch = styled((props: LightSwitchProps) =>
  React.createElement('button', props),
)`
  transition: color 200ms ease-in, background 200ms ease-in;
  border: 1px solid hsl(var(--color-secondary));
  padding: 0.75rem 1.25rem;
  background: hsl(var(--color-bg-primary));
  color: hsl(var(--color-secondary));
  font-size: 0.889em;

  &:focus {
    outline: hsl(var(--color-accent)) dotted 2px;
  }

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
    background: hsl(var(--color-secondary));
    color: hsl(var(--color-bg-primary));
  }
`;

const NavigationWrapper = styled.section`
  grid-area: nav;

  @media print {
    display: none;
  }
`;

const AboutWrapper = styled.aside`
  grid-area: about;

  @media screen and (min-width: 768px) {
    border-left: 0.5px solid hsla(var(--color-grey), 0.25);
  }
`;

const SocialWrapper = styled.aside`
  grid-area: social;

  @media screen and (min-width: 1200px) {
    border-left: 0.5px solid hsla(var(--color-grey), 0.25);
  }
`;

const EmailWrapper = styled.aside`
  grid-area: email;

  @media screen and (min-width: 768px) {
    border-left: 0.5px solid hsla(var(--color-grey), 0.25);
  }
`;

const FooterHeading = styled.h2`
  font-size: 1.125em;
`;

const Footer = (): JSX.Element => {
  const { description } = feed;

  return (
    <>
      <LightSwitchWrapper>
        <LightSwitch
          id="lightswitch-button"
          on="tap:AMP.setState({ lightswitch: !lightswitch.length ? 'inverted' : '' })"
        >
          Switch dark/light mode
        </LightSwitch>
      </LightSwitchWrapper>
      <FooterWrapper>
        <NavigationWrapper>
          <FooterHeading>Navigation</FooterHeading>
          <Navigation />
        </NavigationWrapper>
        <AboutWrapper>
          <FooterHeading>About</FooterHeading>
          <p>{description}</p>
          <span>
            This website also contains a JSON API. More information in the{' '}
            <Link href="/api_docs">
              <a>API docs</a>
            </Link>
            .
          </span>
        </AboutWrapper>
        <SocialWrapper>
          <FooterHeading>Social Media</FooterHeading>
          <Social />
        </SocialWrapper>
        <EmailWrapper>
          <FooterHeading>Secure E-Mail</FooterHeading>
          <GPGLink />
        </EmailWrapper>
      </FooterWrapper>
    </>
  );
};

export default Footer;
