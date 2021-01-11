import { InitialState } from "./state";

// Types
import { ADD_ROW, DELETE_ROW, UPDATE_ROW } from "./Type";

const CRUDReducer = (state = InitialState, action) => {
  switch (action.type) {
    case ADD_ROW:
      return [...state, { ...action.payload, Id: state.length + 1 }];
    case UPDATE_ROW:
      // console.log("reducerstate", action.payload);
      return state.map((data) =>
        data.Id === action.payload.Id ? { ...data, ...action.payload } : data
      );
    case DELETE_ROW:
      return state.filter((data) => data.Id !== action.payload);

    default:
      return state;
  }
};

export default CRUDReducer;
