import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { updateFilter } from "../store/actions";
import RadioButton from './RadioButton';

class SearchRadioButtons extends React.PureComponent {

  filters = {
    none: 'None',
    partial: 'Partial',
    full: 'Full',
    ebooks: 'Ebooks',
    'free-ebooks': 'Free Ebooks',
    'paid-ebooks': 'Paid Ebooks',
  };

  clickHandlers = {};

  getClickHandler = (key, func) => {
    // If no click handler exists for this unique identifier, create one.
    if (!Object.prototype.hasOwnProperty.call(this.clickHandlers, key)) {
      this.clickHandlers[key] = () => func(key);
    }
    return this.clickHandlers[key];
  };

  render() {
    return (
      <div css={css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-left: 10px;
        @media (min-width: 420px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: 960px) {
          grid-auto-flow: column;
        }
      `}>
        {Object.entries(this.filters).map(entry => (
          <RadioButton
            key={entry[0]}
            label={entry[1]}
            checked={this.props.filter === entry[0]}
            onClick={this.getClickHandler(entry[0], this.props.handleSetFilter)}
          />
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  handleSetFilter: filter => dispatch(updateFilter(filter)),
});

SearchRadioButtons.propTypes = {
  filter: PropTypes.string.isRequired,
  handleSetFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchRadioButtons);
