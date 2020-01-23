import React from 'react';
import Head from 'next/head';

import FullBleed from 'components/fullbleed';
import Container from 'components/container';
import Title from 'components/title';
import Heading from 'components/mdx/heading';
import Footer from 'components/footer';

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
      <FullBleed>
        <Container as="article">
          <Heading data-level="2" id="education">
            Education
          </Heading>
        </Container>
      </FullBleed>
      <FullBleed>
        <Footer />
      </FullBleed>
    </main>
  );
};

export default About;
