import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { Router } from '../routes/routes';

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

const OrderByDropdown = (props) => {
  const {
    orderBy,
    searchHandler,
  } = props;

  const onChangeHandler = (event, data) => {
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
  orderBy: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orderBy: state.orderBy,
});

export default connect(mapStateToProps)(OrderByDropdown);
