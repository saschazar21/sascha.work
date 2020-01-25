import React from 'react';
import { DocumentContext } from 'next/document';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components/macro';

import Container from 'components/container';
import Footer from 'components/footer';
import FullBleed from 'components/fullbleed';
import Title from 'components/title';

export interface ErrorProps {
  statusCode: number;
}

const ErrorMsg = styled.p`
  text-align: center;
`;

const Error = ({ statusCode }: ErrorProps): JSX.Element => {
  return (
    <main>
      <Head>
        <title>Error {statusCode}</title>
      </Head>
      <FullBleed data-color="accent">
        <Container>
          <Title>Err... that&apos;s embarrassing!</Title>
          <ErrorMsg>
            The bad-luck-number today is: <strong>{statusCode}</strong>.
          </ErrorMsg>
        </Container>
      </FullBleed>
      <FullBleed>
        <Container>
          <ErrorMsg>
            Please start over by visiting the{' '}
            <Link href="/">
              <a>Home Page</a>
            </Link>
            .
          </ErrorMsg>
        </Container>
      </FullBleed>
      <FullBleed>
        <Footer />
      </FullBleed>
    </main>
  );
};

Error.getInitialProps = ({ res, err }: DocumentContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
