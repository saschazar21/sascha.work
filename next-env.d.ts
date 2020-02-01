/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  export default any;
}

// Any element you create will be accepted
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
    script: any;
  }
}

// The elements you list here will be accepted, attributes don't matter
declare namespace JSX {
  interface IntrinsicElements {
    'amp-img': any;
  }
}

// The elements you list here will be accepted, and only with the attributes that you include here
declare namespace JSX {
  interface AmpImg {
    alt?: string;
    src?: string;
    width?: string;
    height?: string;
    layout?: string;
  }
  interface IntrinsicElements {
    'amp-img': AmpImg;
  }
}
