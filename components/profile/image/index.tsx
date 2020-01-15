import React from 'react';
import styled from 'styled-components/macro';

export enum PROFILEIMAGE_SIZE {
  SMALL = 64,
  MEDIUM = 150,
  LARGE = 240,
}

export interface ProfileImageProps {
  /* custom class name */
  className?: string;
  /* pixel size */
  'data-size'?: PROFILEIMAGE_SIZE;
}

const ProfileImageElement = ({
  'data-size': size,
}: ProfileImageProps): JSX.Element => (
  <amp-img
    alt="Portrait of Sascha Zarhuber"
    layout="responsive"
    width={size || PROFILEIMAGE_SIZE.MEDIUM}
    height={size || PROFILEIMAGE_SIZE.MEDIUM}
    src={`https://avatars0.githubusercontent.com/u/9016897?s=${size ||
      PROFILEIMAGE_SIZE.MEDIUM}`}
  />
);

const ProfileImageFigure = styled.figure`
  display: block;
  margin: 0 auto;
  background: hsl(var(--color-bg-primary));
  border: 4px solid hsl(var(--color-bg-primary));
  border-radius: 9999px;
  box-shadow: 0 4px 12px -6px hsla(var(--color-primary), 0.5);
  height: auto;
  width: ${({ 'data-size': size }: ProfileImageProps): string =>
    `${size || PROFILEIMAGE_SIZE.MEDIUM}px`};
  overflow: hidden;
`;

const ProfileImage = (props: ProfileImageProps): JSX.Element => (
  <ProfileImageFigure {...props}>
    <ProfileImageElement {...props} />
  </ProfileImageFigure>
);

export default ProfileImage;
