import React, { ReactChild } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';

import { SocialAccount } from 'components/profile/social';

const SocialItemWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <a href={profile} rel="noopener noreferrer nofollow" target="_blank">
        <strong>{user}</strong> on <strong>{provider}</strong>
      </a>
    </SocialItemWrapper>
  );
};

export default SocialItem;
