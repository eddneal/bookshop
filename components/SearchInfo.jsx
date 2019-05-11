import React from 'react';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { convertKeywordsStringToObject, removeKeyword } from '../utils';
import SearchCount from './SearchCount';

const SearchInfo = ({ keyword, searchHandler }) => {
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
          onClick={() => searchHandler({ keyword: removeKeyword(keyword, term[0]) })}
        />
      </Label>
      ))}
    </div>
  );
};

SearchInfo.propTypes = {
  keyword: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  keyword: state.search.keyword,
});

export default connect(mapStateToProps)(SearchInfo);
