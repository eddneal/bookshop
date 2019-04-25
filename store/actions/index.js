import searchBooks from '../../api/googleBooksHandler';

export const stateDefaults = {
  items: [],
  totalItems: 0,
  loading: false,
  keyword: '',
  perPage: 40,
  startIndex: 0,
  orderBy: 'relevance',
  filter: 'none',
};

export const loadItems = ({ items = [], totalItems = 0, loading = false }) => ({
  type: 'DATA_LOADED',
  items,
  totalItems,
  loading,
});

export const setLoading = (loading = true) => ({
  type: 'SET_LOADING',
  items: [],
  loading,
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

export const updatePerPage = (perPage = 40) => ({
  type: 'PER_PAGE_UPDATED',
  perPage,
});

export const updateStartIndex = (startIndex = 0) => ({
  type: 'START_INDEX_UPDATED',
  startIndex,
});

export const clearSearch = () => ({
  type: 'SEARCH_CLEAR',
  keyword: '',
  items: [],
  totalItems: 0,
  loading: false,
});

export const updateFilter = (filter = 'none') => ({
  type: 'APPLY_FILTER',
  filter,
});

export const updateOrderBy = (orderBy = 'relevance') => ({
  type: 'ORDER_BY_UPDATED',
  orderBy,
});
