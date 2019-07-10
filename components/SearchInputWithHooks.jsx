import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { addKeyword } from '../utils';
import { updateKeyword } from '../store/actions/search';

const searchInput = ({ searchHandler, keyword, dispatchKeyword }) => {
  const [inputText, setInputText] = useState('');
  const [keywordOption, setKeywordOption] = useState('keyword');

  const searchInputHandler = () => {
    const newKeyword = addKeyword(keyword, { [keywordOption]: inputText });
    dispatchKeyword(newKeyword);
    searchHandler({ keyword: newKeyword });
  };

  const enterKeyUpHandler = (e) => {
    if (e.key === 'Enter') {
      searchInputHandler();
    } else {
      setInputText(e.target.value);
    }
  };

  const selectHandler = (e, { value }) => {
    setKeywordOption(value);
  };

  const options = [
    { key: 'keyword', text: 'Keyword', value: 'keyword' },
    { key: 'intitle', text: 'Title', value: 'intitle' },
    { key: 'inauthor', text: 'Author', value: 'inauthor' },
    { key: 'inpublisher', text: 'Publisher', value: 'inpublisher' },
  ];

  return (
    <>
      <Input
        fluid
        type="text"
        placeholder="Search..."
        onKeyUp={enterKeyUpHandler}
        action
      >
        <input />
        <Select
          css={css`width: 120px;`}
          compact
          options={options}
          defaultValue="keyword"
          onChange={selectHandler}
        />
        <Button
          color="black"
          icon="search"
          content="Search"
          onClick={searchInputHandler}
        />
      </Input>
    </>
  );
};

searchInput.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  dispatchKeyword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  keyword: state.search.keyword,
});

const mapDispatchToProps = dispatch => ({
  dispatchKeyword(keyword) { dispatch(updateKeyword(keyword)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(searchInput);
