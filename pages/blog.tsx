import React from 'react';
import Head from 'next/head';

import FullBleed from 'components/fullbleed';
import Container from 'components/container';
import Title from 'components/title';
import Heading from 'components/mdx/heading';
import Footer from 'components/footer';

import feed from 'public/feed.json';

const Blog = (): JSX.Element => {
  return (
    <main>
      <Head>
        <title>Sascha&apos;s Blog</title>
        <meta
          name="description"
          content={`A Blog about Open Source and JavaScript. Sometimes I also write about my projects including Node.js, React, TypeScript and more. Currently there are ${feed.items.length} articles online.`}
        />
      </Head>
      <FullBleed data-color="grey">
        <Container>
          <Title>Blog</Title>
        </Container>
      </FullBleed>
      <FullBleed data-color="secondary">
        <Container>
          <Heading data-level="2" id="latest-articles">
            Latest Articles
          </Heading>
        </Container>
      </FullBleed>
      <FullBleed>
        <Footer />
      </FullBleed>
    </main>
  );
};

export default Blog;
