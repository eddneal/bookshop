/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import {
  searchResults, searchResult, bookCover, bookTitle,
} from './styles';

const Index = ({ items, keyword }) => (
  <div>
    <ul css={searchResults}>
      {items.map((item) => {
        const src = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
          ? item.volumeInfo.imageLinks.thumbnail
          : ''; // TODO: Add fallback image
        return (
          <li css={searchResult} key={item.id}>
            <img css={bookCover} src={src} alt={item.volumeInfo.title} />
            <div css={bookTitle}>{item.volumeInfo.title}</div>
          </li>
        );
      })}
    </ul>
    {(!items.length && !keyword) && (
      <div>Enter a search term.</div>
    )}
    {(!items.length && keyword) && (
      <div>Your search returned no results, please try another search term.</div>
    )}
  </div>
);

Index.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyword: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  items: state.items,
  keyword: state.keyword,
  totalItems: state.totalItems,
});

export default connect(mapStateToProps)(Index);
