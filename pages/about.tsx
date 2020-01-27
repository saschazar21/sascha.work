import React from 'react';
import Head from 'next/head';

import Container from 'components/container';
import Footer from 'components/footer';
import FullBleed from 'components/fullbleed';
import Title from 'components/title';
import Experience from 'components/profile/experience';

export const config = { amp: true };

const About = (): JSX.Element => {
  return (
    <main>
      <Head>
        <title>About Sascha Zarhuber</title>
        <meta
          name="description"
          content="I'm a Web Developer with a strong focus on Open Source, Node.js, React and TypeScript. This page contains information about my education and work experience."
        />
      </Head>
      <FullBleed data-color="grey">
        <Container>
          <Title>About</Title>
        </Container>
      </FullBleed>
      <Experience />
      <FullBleed>
        <Footer />
      </FullBleed>
    </main>
  );
};

export default About;
