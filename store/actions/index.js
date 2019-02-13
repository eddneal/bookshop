import searchBooks from '../../api/googleBooksHandler';

export const stateDefaults = {
  items: [],
  totalItems: 0,
  loading: false,
  keyword: '',
  perPage: '10',
  orderBy: 'relevance',
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

export const updateFilter = (filter = 'none') => ({
  type: 'APPLY_FILTER',
  filter,
});

export const updateOrderBy = (orderBy = 'relevance') => ({
  type: 'ORDER_BY_UPDATED',
  orderBy,
});
