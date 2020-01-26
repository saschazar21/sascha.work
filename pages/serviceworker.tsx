import React from 'react'
import Head from 'next/head';
import styled from 'styled-components/macro';

import Container from 'components/container';
import Footer from 'components/footer';
import FullBleed from 'components/fullbleed'
import Link from 'next/link';
import Title from 'components/title'

const Intro = styled.p`
text-align: center;
`;

const ServiceWorkerServer = (): JSX.Element => {
  return (
    <main>
      <Head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(console.error));
}
`}} />
      </Head>
      <FullBleed data-color="secondary">
        <Container>
          <Title>ServiceWorker</Title>
          <Intro>
            This page is only a placeholder for installing a <a href="https://developers.google.com/web/fundamentals/primers/service-workers/" rel="noopener noreferrer nofollow" target="_blank">Service Worker</a>, whenever this website is served over an <a href="https://developers.google.com/amp/cache/" rel="noopener noreferrer nofollow" target="_blank">AMP Cache</a>.
          </Intro>
        </Container>
      </FullBleed>
      <FullBleed>
        <Container>
          <Intro>You may go back to the <Link href="/"><a>Home Page</a></Link> now.</Intro>
        </Container>
      </FullBleed>
      <FullBleed>
        <Footer />
      </FullBleed>
    </main>
  )
}

export default ServiceWorkerServer
