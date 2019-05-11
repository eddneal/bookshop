import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'isomorphic-unfetch';
import Logo from '../static/logo.svg';
import { Link } from '../routes/routes';
import clientCredentials from '../authCredentials/client';

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

const linkStyles = css`
  color: teal;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

class Header extends React.Component {
  static handleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  static handleLogout() {
    firebase.auth().signOut();
  }

  constructor(props) {
    super(props);

    const { user } = this.props;
    this.state = {
      user,
    };
  }

  componentDidMount() {
    firebase.initializeApp(clientCredentials);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        return user
          .getIdToken()
          .then(token => fetch('/api/login', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ token }),
          }));
      }
      this.setState({ user: null });
      fetch('api/logout', {
        method: 'POST',
        credential: 'same-origin',
      });
    });
  }

  render() {
    const { user } = this.state;
    const { page } = this.props;
    return (
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
                  active={page === item.name}
                  key={item.name}
                  color="teal"
                  css={css`align-self: center!important; height: 100%;`}
                >
                  <Link route={item.route}>
                    <a css={linkStyles}>{item.name}</a>
                  </Link>
                </Menu.Item>
              ))}
              <Menu.Item
                color="teal"
                css={css`align-self: center!important; height: 100%;`}
              >
                {user ? (
                  <span
                    css={linkStyles}
                    onClick={Header.handleLogout}
                  >
                    Logout
                  </span>
                ) : (
                  <span
                    css={linkStyles}
                    onClick={Header.handleLogin}
                  >
                    Login
                  </span>
                )}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user.authData,
});

export default connect(mapStateToProps)(Header);
