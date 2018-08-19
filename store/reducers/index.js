const searchItems = (state = { items: [], loading: false, searchTerm: '', perPage: '10' }, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return { ...state, items: action.items, loading: action.loading };
    case 'SEARCH_TERM_UPDATED':
      return { ...state, searchTerm: action.searchTerm };
    case 'PER_PAGE_UPDATED':
      return { ...state, perPage: action.perPage };
    default:
      return state;
  }
};

export default searchItems;
