import React, { Component } from 'react';
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
import withSearchRoute from '../components/withSearchRoute';
import { shallowParseInts } from '../utils';
import {
  stateDefaults,
  handleLoadItems,
  clearSearch,
} from '../store/actions/search';

function Search() {
  const SearchInputWithSearchRoute = withSearchRoute(SearchInput);
  const PerPageDropdownWithSearchRoute = withSearchRoute(PerPageDropdown);
  const OrderByDropdownWithSearchRoute = withSearchRoute(OrderByDropdown);
  const SearchInfoWithSearchRoute = withSearchRoute(SearchInfo);
  const SearchPaginationWithSearchRoute = withSearchRoute(SearchPagination);

  return (
    <Layout page="Search">
      <SearchInputWithSearchRoute />
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

            <PerPageDropdownWithSearchRoute />
          </div>
          <div css={css`
              flex: 1 1;
              @media (min-width: 960px) {
                min-width:110px
              }
            `}>
            <OrderByDropdownWithSearchRoute />
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
        <SearchInfoWithSearchRoute />
        <div css={css`
          margin-left: auto;
        `}>
          <SearchPaginationWithSearchRoute />
        </div>
      </div>
      <SearchResults />
    </Layout>
  );
}

Search.getInitialProps = async ({ store, req, res, query }) => {
  const typeCastQuery = shallowParseInts(stateDefaults, query);
  const { keyword, perPage, orderBy, filter, startIndex } = Object.assign(stateDefaults, typeCastQuery);

  return (query.keyword)
    ? store.dispatch(handleLoadItems({
      keyword: decodeURI(keyword),
      perPage,
      startIndex,
      filter,
      orderBy,
    }))
    : store.dispatch(clearSearch());
};

export default Search;
