/** @jsx jsx */
import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {css, jsx} from '@emotion/core';
import Logo from '../static/logo.svg';
import { Link } from '../routes/routes';

export const navItems = [
  {
    name: 'About',
    route: 'about',
  },
  {
    name: 'Search',
    route: 'search',
  },
];

const Header = props => (
  <header>
    <nav>
      <Menu pointing secondary>
        <Menu.Item>
          <Link route="index">
            <a css={css`display: inline-flex;`}>
              <Logo css={css`width: 24px; height: 34px;`} />
            </a>
          </Link>
        </Menu.Item>

        <Menu.Menu position="right">
          {navItems.map(item => (
            <Menu.Item
              active={props.page === item.name}
              key={item.name}
              color="teal"
              css={css`align-self: center!important; height: 100%`}
            >
              <Link route={item.route}>
                <a css={css`color: teal;`}>{item.name}</a>
              </Link>
            </Menu.Item>
          ))}
        </Menu.Menu>
      </Menu>
    </nav>
  </header>
);

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Header;
