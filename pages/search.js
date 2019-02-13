import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from '../routes/routes';
import {
  stateDefaults, handleLoadItems, clearSearch, updateFilter, updateKeyword, updateOrderBy, updatePerPage
} from '../store/actions';
import Layout from '../components/Layout';
import SearchResults from '../components/SearchResults';
import SearchInput from '../components/SearchInput';
import PerPageDropdown from '../components/PerPageDropdown';
import OrderByDropdown from '../components/OrderByDropdown';
import SearchRadioButtons from '../components/SearchRadioButtons';
import SearchInfo from '../components/SearchInfo';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ store, req, res, query }) {
    const { keyword, perPage, orderBy, filter } = Object.assign(stateDefaults, query);
    return (query.keyword) ?
      store.dispatch(handleLoadItems({ keyword: decodeURI(keyword), perPage, orderBy, filter })) :
      store.dispatch(clearSearch());
  }

  handleSearch = (newSearchValue) => {
    const { keyword, perPage, orderBy, filter } = this.props;
    const [key, value] = Object.entries(newSearchValue)[0];
    const dispatchFunction = `dispatch${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    this.props[dispatchFunction](value);
    const newSearchParams = {keyword, perPage, orderBy, filter, ...newSearchValue};
    Router.pushRoute('search', newSearchParams.keyword ? newSearchParams : {});
  };

  render() {
    return (
      <Layout page="Search">
        <div className="hero">
          <h1 className="title">Search</h1>
          <SearchInput searchHandler={this.handleSearch} />
          <SearchRadioButtons />
          <SearchInfo searchHandler={this.handleSearch} />
          <PerPageDropdown searchHandler={this.handleSearch} />
          <OrderByDropdown searchHandler={this.handleSearch} />
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

const mapStateToProps = state => ({
  keyword: state.keyword,
  perPage: state.perPage,
  orderBy: state.orderBy,
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  dispatchKeyword(keyword) { dispatch(updateKeyword(keyword))},
  dispatchPerPage(perPage) { dispatch(updatePerPage(perPage))},
  dispatchFilter(filter) { dispatch(updateFilter(filter))},
  dispatchOrderBy(orderBy) { dispatch(updateOrderBy(orderBy))},
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
