import searchBooks from '../../api/googleBooksHandler';

export const loadItems = ({ items = [], totalItems = 0, loaded = true }) => ({
  type: 'DATA_LOADED',
  items,
  totalItems,
  loaded,
});

export const handleLoadItems = (query, perPage) => dispatch => searchBooks(query, perPage)
  .then((response) => {
    const { items, totalItems } = response;
    dispatch(loadItems({ items, totalItems }));
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
  totalItems: 0,
  loaded: false,
});
