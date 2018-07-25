import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchResults = props => (
  <ul>
    {props.items && props.items.length && props.items.map(item => (
      <li key={item.id}>{JSON.stringify(item.volumeInfo.title)}</li>
    ))
    }
  </ul>
);

SearchResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps)(SearchResults);
