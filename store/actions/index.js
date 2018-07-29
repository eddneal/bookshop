import searchBooks from '../../api/googleBooksHandler';

export const loadItems = (items = [], loaded = true) => ({
  type: 'DATA_LOADED',
  items,
  loaded,
});

export const handleLoadItems = query => dispatch => searchBooks(query)
  .then(response => dispatch(loadItems(response.items)))
  .catch(error => console.log(error));

export const updateSearchTerm = (searchTerm = '') => ({
  type: 'SEARCH_TERM_UPDATED',
  searchTerm,
});
