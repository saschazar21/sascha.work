import React from 'react';

import Title from 'components/title';
import FullBleed from 'components/fullbleed';

export const config = { amp: true };

const Index = (): JSX.Element => {
  return (
    <FullBleed>
      <Title>Hello world</Title>
      This is a demo site
    </FullBleed>
  );
};

export default Index;
