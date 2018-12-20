import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchResults = props => (
  <div>
    <ul className="searchResults">
      {props.items.map((item) => {
        const src = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
          ? item.volumeInfo.imageLinks.thumbnail
          : ''; // TODO: Add fallback image
        return (
          <li className="searchResult" key={item.id}>
            <img className="bookCover" src={src} alt={item.volumeInfo.title} />
            <div className="bookTitle">{item.volumeInfo.title}</div>
          </li>);
      })}
    </ul>
    {(!props.items.length && !props.searchTerm) && (
      <div>Enter a search term.</div>
    )}
    {(!props.items.length && props.searchTerm) && (
      <div>Your search returned no results, please try another search term.</div>
    )}
    <style jsx>{`
      .searchResults {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 30px;
      }
      .searchResult {
        display: flex;
        flex-direction: column;
      }
      .bookCover {
        width: 100%;
        height: auto;
      }
      .bookTitle {
        margin-top: auto;
      }
    `}
    </style>
  </div>
);

SearchResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  items: state.items,
  searchTerm: state.searchTerm,
});

export default connect(mapStateToProps)(SearchResults);
