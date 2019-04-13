import { css } from '@emotion/core';

export const searchRadioButtons = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-left: 10px;
  @media (min-width: 420px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 960px) {
    grid-auto-flow: column;
  }
`;
