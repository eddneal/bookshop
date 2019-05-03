import { css } from '@emotion/core';

export const searchResults = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
  grid-gap: 30px;
`;

export const searchResult = css`
  display: flex;
  flex-direction: column;
`;

export const bookCover = css`
  width: 100%;
  height: auto;
  border: 5px solid #e8e8e8;
`;

export const bookTitle = css`
  background: #e8e8e8;
  padding: 5px 5px 10px;
`;
