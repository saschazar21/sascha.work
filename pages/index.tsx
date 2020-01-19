import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

import Title from 'components/title';
import FullBleed from 'components/fullbleed';
import Container from 'components/container';
import ProfileImage from 'components/profile/image';
import Footer from 'components/footer';

export const config = { amp: true };

const drop = keyframes`
  from {
    opacity: 0.0;
    transform: translateY(-100%);
  }
  68% {
    transform: translateY(12%);
  }
  85% {
    transform: translateY(-6%);
  }
  96% {
    transform: translateY(3%);
  }
  to {
    opacity: 1.0;
    transform: translateY(0);
  }
`;

const ProfileImageAnimated = styled(ProfileImage)`
  animation: ${drop} 450ms ease-in;
`;

const Index = (): JSX.Element => {
  return (
    <main>
      <FullBleed data-color="grey">
        <Container>
          <ProfileImageAnimated />
          <Title>hello, world!</Title>
          <p>
            I&apos;m <strong>Sascha</strong> – a web developer from Austria, and
            this is the place where I&apos;m putting stuff that I&apos;m
            currently working on.
          </p>
          <p>
            When I&apos;m not travelling, or out with my camera, you might find
            me hacking around projects, where <strong>React</strong>,{' '}
            <strong>Node.js</strong> or <strong>TypeScript</strong> (...or a
            combination of these) are involved.
          </p>
        </Container>
      </FullBleed>
      <FullBleed>
        <Container>
          <Footer />
        </Container>
      </FullBleed>
    </main>
  );
};

export default Index;
