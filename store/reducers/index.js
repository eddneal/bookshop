import { stateDefaults } from '../actions';

const searchItems = (state = stateDefaults, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return { ...state, items: action.items, totalItems: action.totalItems, loading: action.loading };
    case 'KEYWORD_UPDATED':
      return { ...state, keyword: action.keyword };
    case 'PER_PAGE_UPDATED':
      return { ...state, perPage: action.perPage };
    case 'APPLY_FILTER':
      return { ...state, filter: action.filter };
    case 'SEARCH_CLEAR':
      return { ...state, items: action.items, totalItems: action.totalItems, keyword: action.keyword, loading: action.loading };
    default:
      return state;
  }
};

export default searchItems;
