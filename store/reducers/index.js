const searchItems = (state = { items: [], loading: false, searchTerm: '' }, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return { ...state, items: action.items, loading: action.loading };
    case 'SEARCH_TERM_UPDATED':
      return { ...state, searchTerm: action.searchTerm };
    default:
      return state;
  }
};

export default searchItems;