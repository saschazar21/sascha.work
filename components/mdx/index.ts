import React from 'react';
import { MDXProviderComponents } from '@mdx-js/react';

import Heading, { HeadingProps } from 'components/mdx/heading';

export const components: MDXProviderComponents = {
  h1: (props: HeadingProps): JSX.Element =>
    React.createElement(Heading, { 'data-level': '1', ...props }),
  h2: (props: HeadingProps): JSX.Element =>
    React.createElement(Heading, { 'data-level': '2', ...props }),
  h3: (props: HeadingProps): JSX.Element =>
    React.createElement(Heading, { 'data-level': '3', ...props }),
  h4: (props: HeadingProps): JSX.Element =>
    React.createElement(Heading, { 'data-level': '4', ...props }),
  h5: (props: HeadingProps): JSX.Element =>
    React.createElement(Heading, { 'data-level': '5', ...props })
};

components.h1.displayName = 'HeadingH1';
components.h2.displayName = 'HeadingH2';
components.h3.displayName = 'HeadingH3';
components.h4.displayName = 'HeadingH4';
components.h5.displayName = 'HeadingH5';

export default components;
