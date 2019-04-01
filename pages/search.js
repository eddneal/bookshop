/** @jsx jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {css, jsx} from '@emotion/core';
import { Router } from '../routes/routes';
import {
  stateDefaults, handleLoadItems, clearSearch, updateFilter, updateKeyword, updateOrderBy, updatePerPage
} from '../store/actions';
import Layout from '../components/Layout';
import SearchResults from '../components/SearchResults';
import SearchInput from '../components/SearchInputWithHooks';
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
        <SearchInput searchHandler={this.handleSearch} />
        <div css={css`
          display: flex;
          flex-direction: column;
          padding: 10px 0 20px;
          border-bottom: 1px solid rgba(34,36,38,.15);
          @media (min-width: 960px) {
            flex-direction: row;
            padding-bottom: 10px;
          }
        `}>
          <SearchRadioButtons />
          <div css={css`
            display: flex;
            padding-top: 10px;
            @media (min-width: 960px) {
              padding-top: 0;
              margin-left: auto;
            }
         `}>
            <div css={css`
              flex: 1 1;
              margin-right: 10px;
              @media (min-width: 960px) {
                min-width: 65px;
              }
            `}>

              <PerPageDropdown searchHandler={this.handleSearch} />
            </div>
            <div css={css`
              flex: 1 1;
              @media (min-width: 960px) {
                min-width:110px
              }
            `}>
              <OrderByDropdown searchHandler={this.handleSearch} />
            </div>
          </div>
        </div>
        <SearchInfo searchHandler={this.handleSearch} />
        <SearchResults />
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
