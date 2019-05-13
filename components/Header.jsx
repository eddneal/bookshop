import React, { useEffect } from 'react';
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

const Header = ({ page, updateAuthData, authData }) => {
  const handleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    const firebaseApp = firebase.initializeApp(clientCredentials);

    firebase.auth().onAuthStateChanged((authData) => {
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

    return () => {
      firebaseApp.delete()
        .then(() => {
          console.log('App deleted successfully');
        })
        .catch((error) => {
          console.log('Error deleting app:', error);
        });
    };
  }, []);

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
              {authData ? (
                <span
                  css={linkStyles}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              ) : (
                <span
                  css={linkStyles}
                  onClick={handleLogin}
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
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
  authData: PropTypes.object,
  updateAuthData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authData: state.user.authData,
});

const mapDispatchToProps = dispatch => ({
  updateAuthData: authData => dispatch(setAuthData(authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
