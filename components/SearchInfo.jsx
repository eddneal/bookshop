import React from 'react';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { convertKeywordsStringToObject, removeKeyword } from '../utils';
import SearchCount from './SearchCount';
import { updateKeyword } from '../store/actions/search';

const SearchInfo = ({ searchHandler, keyword, dispatchKeyword }) => {
  const keywords = convertKeywordsStringToObject(keyword);
  return (
    <div>
      <div css={css`
        display: inline-block;
        padding-right: 10px;
      `}
      >
        <SearchCount />
      </div>
      {Object.entries(keywords).map(term => term[1] && (
      <Label key={term[0]}>
        {term[0] === 'keyword' ? `${term[1]}` : `${term[0]}:${term[1]}`}
        <Icon
          name="delete"
          onClick={() => {
            const newKeyword = removeKeyword(keyword, term[0]);
            dispatchKeyword(newKeyword);
            searchHandler({ keyword: newKeyword });
          }}
        />
      </Label>
      ))}
    </div>
  );
};

SearchInfo.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchInfo);
