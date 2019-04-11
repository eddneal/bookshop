import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Head from './Head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ page, children }) => (
  <div css={css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `}
  >
    <Head title={page} />
    <Header page={page} />
    <div css={css`
      padding: 80px 60px;
      background-image: url(/static/bookcase.jpg);
      background-size: cover;
      background-position: 50% 50%;
    `}>
      <h1 css={css`
        font: 80px 'Gentium Book Basic', serif;
        color: white;
      `}>
        {page}
      </h1>
    </div>
    <main css={css`
        height: 100%;
        padding: 30px;
        @media (min-width: 960px) {
          padding: 60px;
        }
      `}>
      {children}
    </main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.string.isRequired,
};

export default Layout;
