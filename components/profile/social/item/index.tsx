import React, { ReactChild } from 'react';
import Link from 'next/link';
import styled, { AnyStyledComponent } from 'styled-components/macro';

import { SocialAccount } from 'components/profile/social';

const SocialItemWrapper = styled.span`
  /* TODO: define styles */
`;

const styleIcon = (icon: ReactChild) => styled(icon as AnyStyledComponent)`
  margin-right: 1em;
  max-height: 1em;
  max-width: 1em;
  fill: none;
  stroke: HSL(var(--color-grey));
  stroke-width: 2px;
  stroke-linecap: round;
`;

const SocialItem = (props: SocialAccount): JSX.Element => {
  const { icon, profile, provider, username } = props;
  const Icon = styleIcon(icon);

  return (
    <SocialItemWrapper>
      <Icon />
      <Link href={profile}>
        <a>
          <strong>{username}</strong>on<strong>{provider}</strong>
        </a>
      </Link>
    </SocialItemWrapper>
  );
};

export default SocialItem;
