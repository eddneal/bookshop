import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const RadioButton = ({ label, onClick, checked }) => (
  <div>
    <input
      type="radio"
      id={label}
      onChange={onClick}
      checked={checked}
      css={css`
        cursor: pointer;
      `}
    />
    <label
      htmlFor={label}
      css={css`
        display: inline-flex;
        padding: 10px 20px 10px 5px;
        cursor: pointer;
      `}
    >
      {label}
    </label>
  </div>
);

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default memo(RadioButton);
