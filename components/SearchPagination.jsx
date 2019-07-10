import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {
  updateStartIndex,
} from '../store/actions/search';

const SearchPagination = ({ searchHandler, totalItems, perPage, startIndex, dispatchStartIndex }) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const defaultActivePage = startIndex !== 0
    ? Math.ceil(startIndex / perPage)
    : 1;
  const onPageChange = (e, data) => {
    const newIndex = data.activePage !== 1
      ? ((data.activePage - 1) * perPage) + 1
      : 0;
    dispatchStartIndex(newIndex);
    searchHandler({ startIndex: newIndex });
  };

  return (
    <Pagination
      defaultActivePage={defaultActivePage}
      firstItem={null}
      lastItem={null}
      totalPages={totalPages}
      onPageChange={onPageChange}
      style={{ boxShadow: 'none' }}
    />
  );
};

SearchPagination.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  dispatchStartIndex: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalItems: state.search.totalItems,
  perPage: state.search.perPage,
  startIndex: state.search.startIndex,
});

const mapDispatchToProps = dispatch => ({
  dispatchStartIndex(startIndex) { dispatch(updateStartIndex(startIndex)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPagination);
