const user = (state = { authData: null }, action) => {
  switch (action.type) {
    case 'AUTH_DATA_LOADED':
      return { ...state, authData: action.authData };
    default:
      return state;
  }
};

export default user;
