import React, { ReactChild } from 'react';
import styled from 'styled-components/macro';

import SocialItem from 'components/profile/social/item';

import CodepenIcon from 'components/profile/social/icons/codepen.svg';
import ExternalLinkIcon from 'components/profile/social/icons/external-link.svg';
import GithubIcon from 'components/profile/social/icons/github.svg';
import LinkedinIcon from 'components/profile/social/icons/linkedin.svg';
import TwitterIcon from 'components/profile/social/icons/twitter.svg';
import SocialAccounts from 'public/social.json';

const icons: { [key: string]: ReactChild } = {
  codepen: CodepenIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon
};

export interface SocialProps {
  /* limit to just show given providers */
  'data-limit'?: string[];
}

export interface SocialAccount {
  icon?: ReactChild;
  provider: string;
  username: string;
  profile: string;
}

const SocialAccountsList = styled.ul`
  padding-left: 0;
  list-style: none;

  > li:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Social = (props: SocialProps): JSX.Element => {
  const { 'data-limit': limit } = props;
  const { data: socialAccounts } = SocialAccounts;
  const data =
    limit && Array.isArray(limit)
      ? socialAccounts.filter(({ provider }: SocialAccount) =>
          limit.includes(provider)
        )
      : socialAccounts;

  return (
    <SocialAccountsList>
      {data.map((account: SocialAccount, index: number) => (
        <li key={`social-${index}`}>
          <SocialItem
            icon={icons[account.provider] || ExternalLinkIcon}
            {...account}
          />
        </li>
      ))}
    </SocialAccountsList>
  );
};

export default Social;
