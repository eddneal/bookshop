import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Router } from '../routes/routes';
import { addKeyword } from '../utils';

class SearchInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputText: '',
      keywordOption: 'keyword',
    }
  }

  searchInputHandler = () => {
    const {keyword} = this.props;
    this.props.searchHandler({keyword: addKeyword(keyword, {[this.state.keywordOption]: this.state.inputText})});
  };

  enterKeyUpHandler = (e) => {
    if (e.key === 'Enter') {
      this.searchInputHandler();
    } else {
      this.setState({inputText: e.target.value});
    }
  };

  selectHandler = (e, {value}) => {
    this.setState({keywordOption: value});
  };

  options = [
    { key: 'keyword', text: 'Keyword', value: 'keyword' },
    { key: 'intitle', text: 'Title', value: 'intitle' },
    { key: 'inauthor', text: 'Author', value: 'inauthor' },
    { key: 'inpublisher', text: 'Publisher', value: 'inpublisher' },
  ];

  render() {
    return (
      <div>
        <Input
          fluid
          type='text'
          placeholder='Search...'
          onKeyUp={this.enterKeyUpHandler}
          action>
        <input />
          <Select
            compact
            options={this.options}
            defaultValue='keyword'
            onChange={this.selectHandler}
          />
          <Button
            color="black"
            icon="search"
            content="Search"
            onClick={this.searchInputHandler}
          />
        </Input>
      </div>
    );
  }
};

SearchInput.propTypes = {
  keyword: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  keyword: state.keyword,
});

export default connect(mapStateToProps)(SearchInput);
