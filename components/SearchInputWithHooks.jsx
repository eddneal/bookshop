import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { addKeyword } from '../utils';

const searchInput = ({ keyword, searchHandler }) => {
  const [inputText, setInputText] = useState('');
  const [keywordOption, setKeywordOption] = useState('keyword');

  const searchInputHandler = () => {
    searchHandler({ keyword: addKeyword(keyword, { [keywordOption]: inputText }) });
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
  keyword: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  keyword: state.search.keyword,
});

export default connect(mapStateToProps)(searchInput);
