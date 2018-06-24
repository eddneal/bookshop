import React from 'react';
import PropTypes from 'prop-types';

import Head from './Head';
import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div>
    <Head title={props.page} />
    <Header page={props.page} />
    <main>
      {props.children}
    </main>
    <Footer />
    <style jsx>{`
    main {
      padding: 60px 30px;
    }
  `}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.string.isRequired,
};

export default Layout;
