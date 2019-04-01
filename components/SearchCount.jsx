import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchCount = props => (
  <span>
    {props.totalItems}
      &nbsp;Items
  </span>
);

const mapStateToProps = state => ({
  totalItems: state.totalItems,
});

SearchCount.propTypes = {
  totalItems: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(memo(SearchCount));
