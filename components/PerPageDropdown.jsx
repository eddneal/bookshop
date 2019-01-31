import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { Router } from '../routes/routes';

const perPageOptions = [
  {
    text: '10',
    value: '10',
  },
  {
    text: '20',
    value: '20',
  },
  {
    text: '40',
    value: '40',
  },
];

const PerPageDropdown = (props) => {
  const {
    perPage,
    keyword,
    filter,
  } = props;

  const onChangeHandler = (event, data) => {
    Router.pushRoute('search', { keyword, perPage: data.value, filter });
  };

  return (<Dropdown
    placeholder={perPage}
    options={perPageOptions}
    onChange={onChangeHandler}
    selection
    fluid
  />);
};

PerPageDropdown.propTypes = {
  perPage: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  perPage: state.perPage,
  keyword: state.keyword,
  filter: state.filter,
});

export default connect(mapStateToProps)(PerPageDropdown);
