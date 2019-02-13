import React from 'react';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { updateKeywords } from '../store/actions';
import { Router } from '../routes/routes';
import { convertKeywordsStringToObject, removeKeyword } from '../utils';

const SearchInfo = ({keyword, searchHandler}) => {
  const keywords = convertKeywordsStringToObject(keyword);
  return <React.Fragment>
    {Object.entries(keywords).map(term => {
      return term[1] && <Label key={term[0]}>
        {term[0] === 'keyword' ? `${term[1]}`: `${term[0]}:${term[1]}`}
        <Icon name='delete'
              onClick={() => searchHandler({keyword: removeKeyword(keyword, term[0])})} />
      </Label>
    })}
  </React.Fragment>
};

SearchInfo.propTypes = {
  keyword: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  keyword: state.keyword,
});

export default connect(mapStateToProps)(SearchInfo);
