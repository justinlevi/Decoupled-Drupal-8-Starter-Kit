import { ACTIONS } from './actions';

const initialState = {
  activeNode: undefined,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_PAGE:
      return {
        ...state,
        activeNode: payload,
      };
    case ACTIONS.DELETE_PAGE:
      return {
        ...state,
      };
    case ACTIONS.EDIT_PAGE:
      return {
        ...state,
        activeNode: payload,
      };

    default:
      return state;
  }
};

export default reducer;
