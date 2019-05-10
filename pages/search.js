import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { Router } from '../routes/routes';
import Layout from '../components/Layout';
import SearchResults from '../components/SearchResults/index';
import SearchInput from '../components/SearchInputWithHooks';
import PerPageDropdown from '../components/PerPageDropdown';
import OrderByDropdown from '../components/OrderByDropdown';
import SearchRadioButtons from '../components/SearchRadioButtons/index';
import SearchInfo from '../components/SearchInfo';
import SearchPagination from '../components/SearchPagination';
import { shallowParseInts } from "../utils";
import {
  stateDefaults,
  handleLoadItems,
  clearSearch,
  updateFilter,
  updateKeyword,
  updateOrderBy,
  updatePerPage,
  updateStartIndex,
  setLoading
} from '../store/actions';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ store, req, res, query }) {
    const typeCastQuery = shallowParseInts(stateDefaults, query);
    const { keyword, perPage, orderBy, filter, startIndex } = Object.assign(stateDefaults, typeCastQuery);

    return (query.keyword)
      ? store.dispatch(handleLoadItems({
          keyword: decodeURI(keyword),
          perPage,
          startIndex,
          filter,
          orderBy})
        )
      : store.dispatch(clearSearch());
  }

  handleSearch = (newSearchValue) => {
    const { keyword, perPage, orderBy, filter, startIndex, dispatchSetLoading } = this.props;
    const [key, value] = Object.entries(newSearchValue)[0];
    const dispatchFunction = `dispatch${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    const newSearchParams = {keyword, perPage, orderBy, filter, startIndex, ...newSearchValue};

    dispatchSetLoading();
    this.props[dispatchFunction](value);
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
        <div css={css`
          display: flex;
          flex-direction: column;
          padding: 10px 0 20px;
          @media (min-width: 960px) {
            flex-direction: row;
            align-items: center;
          }
        `}>
          <SearchInfo searchHandler={this.handleSearch} />
          <div css={css`
          margin-left: auto;
        `}>
            <SearchPagination searchHandler={this.handleSearch} />
          </div>
        </div>
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
  startIndex: state.startIndex,
});

const mapDispatchToProps = dispatch => ({
  dispatchKeyword(keyword) { dispatch(updateKeyword(keyword))},
  dispatchPerPage(perPage) { dispatch(updatePerPage(perPage))},
  dispatchFilter(filter) { dispatch(updateFilter(filter))},
  dispatchOrderBy(orderBy) { dispatch(updateOrderBy(orderBy))},
  dispatchSetLoading() { dispatch(setLoading())},
  dispatchStartIndex(startIndex) { dispatch(updateStartIndex(startIndex))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
