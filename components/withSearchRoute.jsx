import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Router } from "../routes/routes";
import {
  updateFilter,
  updateKeyword,
  updateLoading,
  updateOrderBy,
  updatePerPage,
  updateStartIndex,
} from '../store/actions/search';

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
  dispatchSetLoading() { dispatch(updateLoading())},
  dispatchStartIndex(startIndex) { dispatch(updateStartIndex(startIndex))}
});

const withSearchRoute = (WrappedComponent) => {
  return class WithSearchRoute extends React.Component {
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
      const props = {
        searchHandler: this.handleSearch,
        ...this.props,
      };

      return (<WrappedComponent {...props} />);
    };
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSearchRoute,
);
