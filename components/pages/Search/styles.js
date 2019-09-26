import { css } from '@emotion/core';

export const firstSection = css`
  display: flex;
  flex-direction: column;
  padding: 10px 0 20px;
  border-bottom: 1px solid rgba(34,36,38,.15);
  @media (min-width: 960px) {
    flex-direction: row;
    padding-bottom: 10px;
  }
`;

export const selectsWrapper = css`
  display: flex;
  padding-top: 10px;
  @media (min-width: 960px) {
    padding-top: 0;
    margin-left: auto;
  }
`;

export const perPageWrapper = css`
  flex: 1 1;
  margin-right: 10px;
  @media (min-width: 960px) {
    min-width: 65px;
  }
`;

export const orderByWrapper = css`
  flex: 1 1;
  @media (min-width: 960px) {
    min-width:110px
  }
`;

export const secondSection = css`
  display: flex;
  flex-direction: column;
  padding: 10px 0 20px;
  @media (min-width: 960px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const paginationWrapper = css`
  margin-left: auto;
`;
