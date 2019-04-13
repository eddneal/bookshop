import React from 'react';
import { css } from '@emotion/core';

export default () => (
  <footer css={css`
    padding: 30px;
    text-align: right;
    background-color: #000;
    color: #fff;
  `}
  >
    <p>Copyright © Bookshop 2018</p>
  </footer>
);
