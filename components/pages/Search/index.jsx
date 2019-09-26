import React from 'react';
import { Router } from '../../../routes/routes';
import Layout from '../../../components/Layout';
import SearchResults from '../../../components/SearchResults/index';
import SearchInput from '../../../components/SearchInputWithHooks';
import PerPageDropdown from '../../../components/PerPageDropdown';
import OrderByDropdown from '../../../components/OrderByDropdown';
import SearchRadioButtons from '../../../components/SearchRadioButtons/index';
import SearchInfo from '../../../components/SearchInfo';
import SearchPagination from '../../../components/SearchPagination';
import withSearchRoute from '../../../components/withSearchRoute';
import { shallowParseInts } from '../../../utils';
import {
  stateDefaults,
  handleLoadItems,
  clearSearch,
} from '../../../store/actions/search';
import {
  firstSection,
  selectsWrapper,
  perPageWrapper,
  orderByWrapper,
  secondSection,
  paginationWrapper,
} from './styles';

function Search() {
  const SearchInputWithSearchRoute = withSearchRoute(SearchInput);
  const PerPageDropdownWithSearchRoute = withSearchRoute(PerPageDropdown);
  const OrderByDropdownWithSearchRoute = withSearchRoute(OrderByDropdown);
  const SearchInfoWithSearchRoute = withSearchRoute(SearchInfo);
  const SearchPaginationWithSearchRoute = withSearchRoute(SearchPagination);

  return (
    <Layout page="Search">
      <SearchInputWithSearchRoute />
      <div css={firstSection}>
        <SearchRadioButtons />
        <div css={selectsWrapper}>
          <div css={perPageWrapper}>
            <PerPageDropdownWithSearchRoute />
          </div>
          <div css={orderByWrapper}>
            <OrderByDropdownWithSearchRoute />
          </div>
        </div>
      </div>
      <div css={secondSection}>
        <SearchInfoWithSearchRoute />
        <div css={paginationWrapper}>
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
