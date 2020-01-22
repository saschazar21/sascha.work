import React, { ReactChild } from 'react';
import Link from 'next/link';
import styled, { AnyStyledComponent } from 'styled-components/macro';
import {
  AvatarIcon,
  HelmetIcon,
  HomeIcon,
  PenIcon
} from '@saschazar/unicat-icons';

import routeConfig from 'public/routes.json';

const iconMap = {
  Home: HomeIcon,
  About: AvatarIcon,
  Blog: PenIcon,
  'API docs': HelmetIcon
};

export interface RouteConfig {
  /* the name of the route */
  name: string;
  /* the path of the route */
  path: string;
}

const Nav = styled.nav`
  ul {
    padding-left: 0;
    list-style-type: none;
  }
`;

const NavItem = styled.span`
  display: inline-flex;
  align-items: center;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styledIcon = (icon: ReactChild): any => styled(
  icon as AnyStyledComponent
)`
  margin-right: 0.5em;
  fill: hsl(var(--color-grey));
  height: 1em;
  width: 1em;
`;

const Navigation = (): JSX.Element => {
  const { data: { routes = [] } = {} } = routeConfig;

  const routeList = routes.map(({ name, path }: RouteConfig, index: number) => {
    const Icon = iconMap[name] ? styledIcon(iconMap[name]) : null;
    return (
      <li key={`navigation-link-${index}`}>
        <NavItem>
          {Icon && <Icon aria-hidden="true" />}
          <Link href={path}>
            <a>{name}</a>
          </Link>
        </NavItem>
      </li>
    );
  });

  return (
    <Nav>
      <ul>{routeList}</ul>
    </Nav>
  );
};

export default Navigation;
