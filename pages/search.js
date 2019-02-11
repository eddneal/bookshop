import React, { Component } from 'react';
import { connect } from 'react-redux';

import { stateDefaults, handleLoadItems, clearSearch } from '../store/actions';
import Layout from '../components/Layout';
import SearchResults from '../components/SearchResults';
import SearchInput from '../components/SearchInput';
import PerPageDropdown from '../components/PerPageDropdown';
import OrderByDropdown from '../components/OrderByDropdown';
import SearchRadioButtons from '../components/SearchRadioButtons';
import SearchInfo from '../components/SearchInfo';

class Search extends Component {
  static async getInitialProps({ store, req, res, query }) {
    const { keyword, perPage, orderBy, filter } = Object.assign(stateDefaults, query);
    return (query.keyword) ?
      store.dispatch(handleLoadItems({ keyword: decodeURI(keyword), perPage, orderBy, filter })) :
      store.dispatch(clearSearch());
  }

  render() {
    return (
      <Layout page="Search">
        <div className="hero">
          <h1 className="title">Search</h1>
          <SearchInput />
          <SearchRadioButtons />
          <SearchInfo />
          <PerPageDropdown />
          <OrderByDropdown />
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
