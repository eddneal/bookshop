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
import { setAuthData } from '../store/actions/user';

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

  componentDidMount() {
    firebase.initializeApp(clientCredentials);

    firebase.auth().onAuthStateChanged((authData) => {
      const { updateAuthData } = this.props;
      if (authData) {
        updateAuthData(authData);
        return authData
          .getIdToken()
          .then(token => fetch('/api/login', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ token }),
          }));
      }
      updateAuthData(null);
      fetch('api/logout', {
        method: 'POST',
        credential: 'same-origin',
      });
    });
  }

  render() {
    const { page, user } = this.props;
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
  updateAuthData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.authData,
});

const mapDispatchToProps = dispatch => ({
  updateAuthData: authData => dispatch(setAuthData(authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
