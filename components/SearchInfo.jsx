import React from 'react';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react'
import { updateKeywords } from '../store/actions';
import { Router } from '../routes/routes';
import { convertKeywordsStringToObject, removeKeyword } from '../utils';

const SearchInfo = ({keyword, perPage, filter}) => {

  const keywords = convertKeywordsStringToObject(keyword);
  console.log(keyword, keywords);
  return <React.Fragment>
    {Object.entries(keywords).map(term => {
      return term[1] && <Label key={term[0]}>
        {term[0] === 'keyword' ? `${term[1]}`: `${term[0]}:${term[1]}`}
        <Icon name='delete'
              onClick={() => {
                const newKeywords = removeKeyword(keyword, term[0]);
                const searchParams = newKeywords
                  ? { keyword: newKeywords, perPage, filter }
                  : {};
                Router.pushRoute('search', searchParams);
              }} />
      </Label>
    })}
  </React.Fragment>
};

const mapStateToProps = (state) => ({
  keyword: state.keyword,
  perPage: state.perPage,
  filter: state.filter,
});

export default connect(mapStateToProps)(SearchInfo);