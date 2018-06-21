import React from 'react';
import PropTypes from 'prop-types';

import Head from './Head';

const Layout = props => (
  <div>
    <Head title={props.page} />
    <main>
      {props.children}
    </main>
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
