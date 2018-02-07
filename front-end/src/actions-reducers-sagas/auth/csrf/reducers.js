export const initialState = {
  csrfToken: null
};

export const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    case 'SET_CSRF_TOKEN':
      sessionStorage.setItem('csrfToken',payload);
      return {
        ...state,
        csrfToken: payload,
      };
    default:
      return state;
  }
};

export default reducer;
