import { ADD_ROW, DELETE_ROW, UPDATE_ROW } from "./Type";

export const addData = (data) => ({
  type: ADD_ROW,
  payload: data,
});
export const updateData = (data) => ({
  type: UPDATE_ROW,
  payload: data,
});
export const deleteData = (data) => ({
  type: DELETE_ROW,
  payload: data,
});
