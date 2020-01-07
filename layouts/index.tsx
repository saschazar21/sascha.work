import React from 'react';

import Title from 'components/title';

export const config = { amp: true };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultLayout = (props: any): JSX.Element => {
  const { children, title } = props;

  return (
    <main>
      {title && <Title>{title}</Title>}
      {children}
    </main>
  );
};

export default DefaultLayout;
