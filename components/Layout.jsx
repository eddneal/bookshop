/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {css, jsx} from '@emotion/core';
import Head from './Head';
import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div>
    <Head title={props.page} />
    <Header page={props.page} />
    <div css={css`
      padding: 80px 60px;
      background-image: url(/static/bookcase.jpg);
      background-size: cover;
      background-position: 50% 50%;
    `}>
      <h1 css={css`
        font: 80px 'Gentium Book Basic', serif;
        color: white;
      `}>{props.page}</h1>
    </div>
    <main css={css`
        padding: 30px;
        @media (min-width: 960px) {
          padding: 60px;
        }
      `}>
      {props.children}
    </main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.string.isRequired,
};

export default Layout;
