import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import { updateSearchTerm, handleLoadItems } from '../store/actions';
import PropTypes from "prop-types";

const searchInput = (props) => {
  let inputNode;
  const { setSearchTerm, fetchItems } = props;

  const searchInputHandler = () => {
    const searchTerm = inputNode.inputRef.value;
    setSearchTerm(searchTerm);
    fetchItems(searchTerm);
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
        defaultValue=""
        onKeyUp={enterKeyUpHandler}
        ref={input => inputNode = input}
      />
    </div>
  );
};

searchInput.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setSearchTerm: searchTerm => dispatch(updateSearchTerm(searchTerm)),
  fetchItems: searchTerm => dispatch(handleLoadItems(searchTerm)),
});

export default connect(() => ({}), mapDispatchToProps)(searchInput);
