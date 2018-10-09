import { combineReducers } from "redux";
import { graphASTReducer } from "./graphASTReducer";
import { metadataReducer } from "./metadataReducer";

export const graphReducer = combineReducers({
  graphAST: graphASTReducer,
  metadata: metadataReducer
});
