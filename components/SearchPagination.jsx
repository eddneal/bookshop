import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';

const SearchPagination = ({ searchHandler, totalItems, perPage, startIndex }) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const defaultActivePage = startIndex !== 0
    ? Math.ceil(startIndex / perPage)
    : 1;
  const onPageChange = (e, data) => {
    const newIndex = data.activePage !== 1
      ? ((data.activePage - 1) * perPage) + 1
      : 0;
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

const mapStateToProps = state => ({
  totalItems: state.totalItems,
  perPage: state.perPage,
  startIndex: state.startIndex,
});

export default connect(mapStateToProps)(SearchPagination);