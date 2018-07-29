import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchResults = props => (
  <ul className="searchResults">
    {props.items && props.items.length && props.items.map(item => (
      <li className="searchResult" key={item.id}>
        <img className="bookCover" src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />
        <div className="bookTitle">{item.volumeInfo.title}</div>
      </li>
    ))
    }
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
  </ul>
);

SearchResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps)(SearchResults);
