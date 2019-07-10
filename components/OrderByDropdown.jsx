import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { updateOrderBy } from '../store/actions/search';


const orderByOptions = [
  {
    text: 'Relevance',
    value: 'relevance',
  },
  {
    text: 'Newest',
    value: 'newest',
  },
];

const OrderByDropdown = ({ searchHandler, dispatchOrderBy, orderBy }) => {
  const onChangeHandler = (event, data) => {
    dispatchOrderBy(data.value);
    searchHandler({ orderBy: data.value });
  };

  const placeholder = orderByOptions.find(options => options.value === orderBy).text;

  return (
    <Dropdown
      placeholder={placeholder}
      options={orderByOptions}
      onChange={onChangeHandler}
      selection
      fluid
    />
  );
};

OrderByDropdown.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  dispatchOrderBy: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orderBy: state.search.orderBy,
});

const mapDispatchToProps = dispatch => ({
  dispatchOrderBy(orderBy) { dispatch(updateOrderBy(orderBy)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderByDropdown);
