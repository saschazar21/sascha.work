import React, { ReactChild } from 'react';
import Link from 'next/link';
import styled, { AnyStyledComponent } from 'styled-components/macro';

import { SocialAccount } from 'components/profile/social';

const SocialItemWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

const styleIcon = (icon: ReactChild): any => styled(icon as AnyStyledComponent)`
  margin-right: 0.5em;
  height: 1em;
  width: 1em;
  fill: none;
  stroke: HSL(var(--color-grey));
  stroke-width: 2px;
  stroke-linecap: round;
`;

const SocialItem = (props: SocialAccount): JSX.Element => {
  const { icon, profile, provider, username } = props;
  const Icon = styleIcon(icon);
  const user = username.replace(/^Sascha Zarhuber$/i, 'me');

  return (
    <SocialItemWrapper>
      <Icon aria-hidden="true" title={`${provider} icon`} />
      <Link href={profile}>
        <a>
          <strong>{user}</strong> on <strong>{provider}</strong>
        </a>
      </Link>
    </SocialItemWrapper>
  );
};

export default SocialItem;
