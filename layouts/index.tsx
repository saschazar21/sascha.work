import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import Container from 'components/container';
import Footer from 'components/footer';
import FullBleed from 'components/fullbleed';
import Title from 'components/title';
import { CodeHighlight } from 'components/style';
import components from 'components/mdx';

export const config = { amp: true };

const CustomContainer = styled(Container)`
  pre {
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  pre > code {
    border-radius: 8px;
    border: 4px solid hsla(var(--color-primary), 0.3);
    box-shadow: inset 0 2px 10px -2px hsla(var(--color-bg-primary), 0.75);
    font-size: 0.8em;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultLayout = (props: any): JSX.Element => {
  const { children, title, robots, summary, tags } = props;
  const hasRobots = robots && robots.join(',');
  const hasTags = tags && tags.join(',');

  return (
    <main>
      <Head>
        {hasRobots && <meta name="robots" content={hasRobots} />}
        {hasTags && <meta name="keywords" content={hasTags} />}
        {summary && <meta name="description" content={summary} />}
      </Head>
      <CodeHighlight />
      {title && (
        <FullBleed data-color="grey">
          <Container>
            <Title>{title}</Title>
          </Container>
        </FullBleed>
      )}
      <FullBleed>
        <CustomContainer as="article">
          <MDXProvider components={components}>{children}</MDXProvider>
        </CustomContainer>
      </FullBleed>
      <FullBleed>
        <Footer />
      </FullBleed>
    </main>
  );
};

export default DefaultLayout;
