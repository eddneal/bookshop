import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Router } from "../routes/routes";
import { updateLoading } from '../store/actions/search';

const mapStateToProps = state => ({
  keyword: state.search.keyword,
  perPage: state.search.perPage,
  orderBy: state.search.orderBy,
  filter: state.search.filter,
  startIndex: state.search.startIndex,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetLoading() { dispatch(updateLoading()); },
});

const withSearchRoute = (WrappedComponent) => {
  return class WithSearchRoute extends React.Component {
    handleSearch = (newSearchValue) => {
      const { keyword, perPage, orderBy, filter, startIndex, dispatchSetLoading } = this.props;
      const newSearchParams = {keyword, perPage, orderBy, filter, startIndex, ...newSearchValue};

      dispatchSetLoading();
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
