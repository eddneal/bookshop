const user = (state = { authData: null }, action) => {
  switch (action.type) {
    case 'SET_AUTH_DATA':
      return { ...state, authData: action.authData };
    default:
      return state;
  }
};

export default user;
