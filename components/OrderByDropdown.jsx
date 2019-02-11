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
    perPage,
    keyword,
    filter,
    orderBy
  } = props;

  const onChangeHandler = (event, data) => {
    Router.pushRoute('search', { keyword, perPage, orderBy: data.value, filter });
  };

  return (<Dropdown
    placeholder={orderBy}
    options={orderByOptions}
    onChange={onChangeHandler}
    selection
    fluid
  />);
};

OrderByDropdown.propTypes = {
  perPage: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  perPage: state.perPage,
  keyword: state.keyword,
  filter: state.filter,
  orderBy: state.orderBy,
});

export default connect(mapStateToProps)(OrderByDropdown);
