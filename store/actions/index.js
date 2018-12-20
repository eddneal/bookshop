import searchBooks from '../../api/googleBooksHandler';

export const loadItems = (items = [], loaded = true) => ({
  type: 'DATA_LOADED',
  items,
  loaded,
});

export const handleLoadItems = (query, perPage) => dispatch => searchBooks(query, perPage)
  .then((response) => {
    dispatch(loadItems(response.items));
    dispatch(updateSearchTerm(query));
  })
  .catch(error => console.log(error));

export const updateSearchTerm = (searchTerm = '') => ({
  type: 'SEARCH_TERM_UPDATED',
  searchTerm,
});

export const updatePerPage = (perPage = 10) => ({
  type: 'PER_PAGE_UPDATED',
  perPage,
});

export const clearSearch = () => ({
  type: 'SEARCH_CLEAR',
  searchTerm: '',
  items: [],
  loaded: false,
});
