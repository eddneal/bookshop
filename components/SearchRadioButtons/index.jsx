import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFilter } from '../../store/actions';
import RadioButton from '../RadioButton';
import { searchRadioButtons } from './styles';

const Index = ({ filter, handleSetFilter }) => {
  const filters = {
    none: 'None',
    partial: 'Partial',
    full: 'Full',
    ebooks: 'Ebooks',
    'free-ebooks': 'Free Ebooks',
    'paid-ebooks': 'Paid Ebooks',
  };

  const clickHandlers = {};

  const getClickHandler = (key, func) => {
    // If no click handler exists for this unique identifier, create one.
    if (!Object.prototype.hasOwnProperty.call(clickHandlers, key)) {
      clickHandlers[key] = () => func(key);
    }
    return clickHandlers[key];
  };

  return (
    <div css={searchRadioButtons}>
      {Object.entries(filters).map(entry => (
        <RadioButton
          key={entry[0]}
          label={entry[1]}
          checked={filter === entry[0]}
          onClick={getClickHandler(entry[0], handleSetFilter)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  handleSetFilter: filter => dispatch(updateFilter(filter)),
});

Index.propTypes = {
  filter: PropTypes.string.isRequired,
  handleSetFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));
