/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {css, jsx} from '@emotion/core';

class RadioButton extends React.PureComponent {
  render() {
    return (
      <div>
        <input
          type="radio"
          id={this.props.label}
          onChange={this.props.onClick}
          checked={this.props.checked}
          css={css`
            cursor: pointer;
          `}
        />
        <label htmlFor={this.props.label}
          css={css`
            display: inline-flex;
            padding: 10px 20px 10px 5px;
            cursor: pointer;
          `}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default RadioButton;
