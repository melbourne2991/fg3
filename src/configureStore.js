import { combineEpics } from "redux-observable";
import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import * as R from "ramda";
import undoable from "redux-undo";
import { rootReducer } from "./reducers";

export function configureStore() {
  const epicMiddleware = createEpicMiddleware();

  const rootEpic = combineEpics();

  epicMiddleware.run(rootEpic);

  return createStore(undoable(rootReducer), applyMiddleware(epicMiddleware));
}
