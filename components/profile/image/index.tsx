import React from 'react';
import styled from 'styled-components/macro';
import { PortraitIcon } from '@saschazar/unicat-icons';

export const PROFILEIMAGE_URL =
  'https://avatars0.githubusercontent.com/u/9016897';

export enum PROFILEIMAGE_SIZE {
  SMALL = 64,
  MEDIUM = 150,
  LARGE = 240,
  XLARGE = 370,
}

export interface ProfileImageProps {
  /* custom class name */
  className?: string;
  /* pixel size */
  'data-size'?: PROFILEIMAGE_SIZE;
}

const ProfileImageFallback = styled(
  PortraitIcon as (props: { placeholder: string }) => JSX.Element
)`
  max-height: 100%;
  max-width: 100%;
  background: #b2aa6f; /* green background color of image */
  fill: #120200; /* brownish hair color tone */
`;

const ProfileImageElement = ({
  'data-size': size,
}: ProfileImageProps): JSX.Element => (
  <amp-img
    alt="Portrait of Sascha Zarhuber"
    layout="responsive"
    width={size || PROFILEIMAGE_SIZE.MEDIUM}
    height={size || PROFILEIMAGE_SIZE.MEDIUM}
    src={`${PROFILEIMAGE_URL}?s=${size || PROFILEIMAGE_SIZE.MEDIUM}`}
    srcset={`${PROFILEIMAGE_URL}?s=${PROFILEIMAGE_SIZE.MEDIUM} ${PROFILEIMAGE_SIZE.MEDIUM}w, ${PROFILEIMAGE_URL}?s=${PROFILEIMAGE_SIZE.LARGE} ${PROFILEIMAGE_SIZE.LARGE}w, ${PROFILEIMAGE_URL}?s=${PROFILEIMAGE_SIZE.XLARGE} ${PROFILEIMAGE_SIZE.XLARGE}w, ${PROFILEIMAGE_URL}?s=460 460w`}
  >
    <ProfileImageFallback placeholder="" />
  </amp-img>
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
  <ProfileImageFigure aria-label="Portrait of Sascha Zarhuber" {...props}>
    <ProfileImageElement {...props} />
  </ProfileImageFigure>
);

export default ProfileImage;
