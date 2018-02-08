export const initialState = {
  apolloClient: null
};

export const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case 'SET_APOLLO_CLIENT':
      return {
        ...state,
        apolloClient: payload,
      };
    default:
      return state;
  }
};

export default reducer;
