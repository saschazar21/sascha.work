import React from 'react';

import Title from 'components/title';
import FullBleed from 'components/fullbleed';
import Container from 'components/container';
import ProfileImage from 'components/profile/image';

export const config = { amp: true };

const Index = (): JSX.Element => {
  return (
    <main>
      <FullBleed data-color="grey">
        <Container>
          <ProfileImage />
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
          <h2 id="projects">Projects</h2>
        </Container>
      </FullBleed>
    </main>
  );
};

export default Index;
