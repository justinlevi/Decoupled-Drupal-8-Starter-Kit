export const initialState = {
  csrfToken: null
};

export const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case 'GET_CSRF_TOKEN':
    return state.csrfToken;

    case 'SET_CSRF_TOKEN':
      console.log("CSRF TOKEN SET");
      return {
        ...state,
        csrfToken: payload,
      };
    default:
      return state;
  }
};

export default reducer;
