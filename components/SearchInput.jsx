import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { updateSearchTerm, handleLoadItems } from '../store/actions';

const searchInput = (props) => {
  let inputNode;
  const { perPage, setSearchTerm, fetchItems } = props;

  const searchInputHandler = () => {
    const searchTerm = inputNode.inputRef.value;
    setSearchTerm(searchTerm);
    fetchItems(searchTerm, perPage);
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
  perPage: PropTypes.number.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  perPage: state.perPage,
});

const mapDispatchToProps = dispatch => ({
  setSearchTerm: searchTerm => dispatch(updateSearchTerm(searchTerm)),
  fetchItems: (searchTerm, perPage) => dispatch(handleLoadItems(searchTerm, perPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(searchInput);
