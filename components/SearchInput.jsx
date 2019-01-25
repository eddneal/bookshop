import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Router } from '../routes/routes';

const searchInput = (props) => {
  let inputNode;

  const searchInputHandler = () => {
    const keyword = inputNode.inputRef.value;
    const {perPage, filter} = props;
    Router.pushRoute('search', { keyword, perPage, filter });
  };

  const enterKeyUpHandler = (e) => {
    if (e.key === 'Enter') {
      searchInputHandler();
    }
  };

  return (
    <div>
      <Input
        fluid
        action={
          <Button
            color="black"
            icon="search"
            content="Search"
            onClick={searchInputHandler}
          />}
        placeholder="Search..."
        defaultValue={props.searchTerm}
        onKeyUp={enterKeyUpHandler}
        ref={input => inputNode = input}
      />
    </div>
  );
};

searchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  searchTerm: state.searchTerm,
  perPage: state.perPage,
  filter: state.filter,
});

export default connect(mapStateToProps)(searchInput);
