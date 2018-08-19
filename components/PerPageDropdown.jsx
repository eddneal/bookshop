import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { updatePerPage } from '../store/actions';

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
  const { perPage, setPerPage } = props;

  return (<Dropdown
    placeholder={perPage}
    options={perPageOptions}
    onChange={setPerPage}
    selection
    fluid
  />);
};

PerPageDropdown.propTypes = {
  perPage: PropTypes.string.isRequired,
  setPerPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  perPage: state.perPage,
});

const mapDispatchToProps = dispatch => ({
  setPerPage: (event, data) => dispatch(updatePerPage(data.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerPageDropdown);
