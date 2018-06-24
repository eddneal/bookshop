import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Link } from '../routes/routes';

export const navItems = [
  {
    name: 'Home',
    route: 'index',
  },
  {
    name: 'About',
    route: 'about',
  },
];

const Header = props => (
  <header>
    <nav>
      <Menu pointing secondary>
        {navItems.map(item => (
          <Menu.Item active={props.page === item.name} key={item.name}>
            <Link route={item.route}>
              <a>{item.name}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  </header>
);

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Header;
