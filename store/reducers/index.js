const searchItems = (state = { items: [], totalItems: 0, loading: false, searchTerm: '', perPage: '10' }, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return { ...state, items: action.items, totalItems: action.totalItems, loading: action.loading };
    case 'SEARCH_TERM_UPDATED':
      return { ...state, searchTerm: action.searchTerm };
    case 'PER_PAGE_UPDATED':
      return { ...state, perPage: action.perPage };
    case 'SEARCH_CLEAR':
      return { ...state, items: action.items, totalItems: action.totalItems, searchTerm: action.searchTerm, loading: action.loading };
    default:
      return state;
  }
};

export default searchItems;
