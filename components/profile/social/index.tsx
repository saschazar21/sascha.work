import React from 'react';

import SocialItem from 'components/profile/social/item';

import SocialAccounts from 'public/social.json';

export interface SocialProps {
  /* limit to just show given providers */
  'data-limit'?: string[];
}

export interface SocialAccount {
  provider: string;
  username: string;
  profile: string;
}

const Social = (props: SocialProps): JSX.Element => {
  const { 'data-limit': limit } = props;
  const data =
    limit && Array.isArray(limit)
      ? SocialAccounts.filter(({ provider }: SocialAccount) =>
          limit.includes(provider),
        )
      : SocialAccounts;

  return (
    <ul>
      {data.map((account: SocialAccount, index: number) => (
        <li key={`social-${index}`}>
          <SocialItem {...account} />
        </li>
      ))}
    </ul>
  );
};

export default Social;
