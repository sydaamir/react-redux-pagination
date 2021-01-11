import { combineReducers } from "redux";

import { CRUDReducer } from "./crud";

// combine reducer
export const AllReducer = combineReducers({
  CRUD: CRUDReducer,
});
