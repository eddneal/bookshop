import { stateDefaults } from '../actions';

const search = (state = stateDefaults, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return { ...state, items: action.items, totalItems: action.totalItems, loading: action.loading };
    case 'KEYWORD_UPDATED':
      return { ...state, keyword: action.keyword };
    case 'PER_PAGE_UPDATED':
      return { ...state, perPage: action.perPage };
    case 'START_INDEX_UPDATED':
      return { ...state, startIndex: action.startIndex };
    case 'ORDER_BY_UPDATED':
      return { ...state, orderBy: action.orderBy };
    case 'APPLY_FILTER':
      return { ...state, filter: action.filter };
    case 'SEARCH_CLEAR':
      return { ...state, items: action.items, totalItems: action.totalItems, keyword: action.keyword, loading: action.loading };
    case 'SET_LOADING':
      return { ...state, items: action.items, loading: action.loading };
    default:
      return state;
  }
};

export default search;
