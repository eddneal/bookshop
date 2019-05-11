import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

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

const PerPageDropdown = ({ perPage, searchHandler }) => {
  const onChangeHandler = (event, data) => {
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
  perPage: PropTypes.number.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  perPage: state.search.perPage,
});

export default connect(mapStateToProps)(PerPageDropdown);
