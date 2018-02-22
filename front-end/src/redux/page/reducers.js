import { ACTIONS } from './actions';

const initialState = {
  pages: [],
  activePage: undefined,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.FETCH_PAGES: return { ...state };
    case ACTIONS.FETCH_PAGES_SUCCESS:
      return {
        ...state,
        pages: payload.data.user.nodes.entities.map((node) => {
          const newNode = { ...node };
          newNode.images = newNode.images.map(image => (
            { url: image.entity.image.derivative.url, mid: image.mid }
          ));
          return newNode;
        }),
      };
    case ACTIONS.FETCH_PAGES_FAILURE: return { ...state };
    case ACTIONS.ADD_PAGE:
      return {
        ...state,
        activePage: payload.activePage,
      };
    case ACTIONS.DELETE_PAGE: return { ...state };
    case ACTIONS.EDIT_PAGE:
      return {
        ...state,
        activePage: payload.activePage,
      };

    default: return { ...state };
  }
};

export default reducer;
