import React from 'react';
import PropTypes from 'prop-types';

class RadioButton extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <input type="radio" id={this.props.label} onClick={this.props.onClick} checked={this.props.checked} />
        <label htmlFor={this.props.label}>{this.props.label}</label>
      </React.Fragment>
    );
  }
}

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default RadioButton;
