import { combineReducers } from "redux";
import { graphReducer } from "./graphReducer";

export const rootReducer = combineReducers({
  graph: graphReducer
});
