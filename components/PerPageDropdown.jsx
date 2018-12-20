import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { handleLoadItems, updatePerPage } from '../store/actions';

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
    searchTerm,
    setPerPage,
    fetchItems,
  } = props;

  const onChangeHandler = (event, data) => {
    setPerPage({ perPage: data.value });
    fetchItems({ searchTerm, perPage: data.value });
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
  setPerPage: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  perPage: state.perPage,
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = dispatch => ({
  setPerPage: ({ perPage }) => dispatch(updatePerPage(perPage)),
  fetchItems: ({ searchTerm, perPage }) => dispatch(handleLoadItems(searchTerm, perPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerPageDropdown);
