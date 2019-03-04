import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { addKeyword } from '../utils';

const searchInput = (props) => {
  const [inputText, setInputText] = useState('');
  const [keywordOption, setKeywordOption] = useState('keyword');

  const searchInputHandler = () => {
    const { keyword, searchHandler } = props;
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
    <Fragment>
      <Input
        fluid
        type="text"
        placeholder="Search..."
        onKeyUp={enterKeyUpHandler}
        action
      >
        <input />
        <Select
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
    </Fragment>
  );
};

searchInput.propTypes = {
  keyword: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  keyword: state.keyword,
});

export default connect(mapStateToProps)(searchInput);
