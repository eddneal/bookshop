import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleLoadItems, clearSearch } from '../store/actions';
import Layout from '../components/Layout';
import SearchResults from '../components/SearchResults';
import SearchInput from '../components/SearchInput';
import PerPageDropdown from '../components/PerPageDropdown';

class Search extends Component {
  static async getInitialProps({store, req, res, query}) {
    return (query.keyword) ?
      store.dispatch(handleLoadItems(query.keyword, store.getState().perPage)) :
      store.dispatch(clearSearch());
  }

  render() {
    return (
      <Layout page="Search">
        <div className="hero">
          <h1 className="title">Search</h1>
          <SearchInput />
          <PerPageDropdown />
          <SearchResults />
        </div>
        <style jsx>{`
            .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
        `}
        </style>
      </Layout>
    );
  }
}

export default connect()(Search);
