import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { updatePerPage } from '../store/actions/search';

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

const PerPageDropdown = ({ searchHandler, perPage, dispatchPerPage }) => {
  const onChangeHandler = (event, data) => {
    dispatchPerPage(data.value);
    searchHandler({ perPage: data.value });
  };

  return (
    <Dropdown
      placeholder={perPage.toString()}
      options={perPageOptions}
      onChange={onChangeHandler}
      selection
      fluid
    />
  );
};

PerPageDropdown.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  dispatchPerPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  perPage: state.search.perPage,
});

const mapDispatchToProps = dispatch => ({
  dispatchPerPage(perPage) { dispatch(updatePerPage(perPage)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PerPageDropdown);
