import { FILTERING, GET_ALL_ITEMS } from "../types";

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {
        items: action.payload,
      };
    case FILTERING:
      return {
        ...state,
        isFiltered: action.payload,
      };
    default:
      return state;
  }
};

export default itemsReducer;
