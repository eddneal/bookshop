import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'ramda';

const SearchCount = ({ totalItems }) => (
  <>
    { totalItems > 0 && (
      <span>
        {totalItems}
        &nbsp;
        Book
        {totalItems > 1 ? 's' : ''}
        &nbsp;
        found
      </span>
    )
    }
  </>
);

const mapStateToProps = state => ({
  totalItems: state.totalItems,
});

SearchCount.propTypes = {
  totalItems: PropTypes.number.isRequired,
};

export default compose(memo, connect(mapStateToProps))(SearchCount);
