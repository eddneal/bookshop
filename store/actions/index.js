import searchBooks from '../../api/googleBooksHandler';

export const stateDefaults = {
  items: [],
  totalItems: 0,
  loading: false,
  keyword: '',
  perPage: '10',
  filter: 'none',
};

export const loadItems = ({ items = [], totalItems = 0, loaded = true }) => ({
  type: 'DATA_LOADED',
  items,
  totalItems,
  loaded,
});

export const handleLoadItems = params => dispatch => searchBooks(params)
  .then((response) => {
    const { items, totalItems } = response;
    dispatch(loadItems({ items, totalItems }));
    dispatch(updateKeyword(params.keyword));
    dispatch(updatePerPage(params.perPage));
    dispatch(setFilter(params.filter)); //TODO: better way
  })
  .catch(error => console.log(error));

export const updateKeyword = (keyword = '') => ({
  type: 'KEYWORD_UPDATED',
  keyword,
});

export const updatePerPage = (perPage = 10) => ({
  type: 'PER_PAGE_UPDATED',
  perPage,
});

export const clearSearch = () => ({
  type: 'SEARCH_CLEAR',
  keyword: '',
  items: [],
  totalItems: 0,
  loaded: false,
});

export const setFilter = (filter = 'none') => ({
  type: 'APPLY_FILTER',
  filter,
});

