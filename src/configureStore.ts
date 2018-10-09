import { combineEpics } from "redux-observable";
import { applyMiddleware, createStore, combineReducers, Reducer } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { default as undoable } from "redux-undo";
import { GraphStateUtils } from "./Graph/state";

export interface ConfigureStoreParams {
  graphReducer: Reducer;
  GraphStateUtils: GraphStateUtils;
}

export function configureStore({
  graphReducer,
  GraphStateUtils
}: ConfigureStoreParams) {
  const epicMiddleware = createEpicMiddleware();

  const rootEpic = combineEpics();

  epicMiddleware.run(rootEpic);

  const graph = GraphStateUtils.createDefault();

  const initialState = {
    past: [],
    present: {
      graph
    },
    future: []
  };

  const rootReducer = () =>
    undoable(
      combineReducers({
        graph: graphReducer
      })
    );

  const store = createStore(
    rootReducer(),
    initialState as any,
    applyMiddleware(epicMiddleware)
  );

  if ((module as any).hot) {
    (module as any).hot.accept(() => {
      const nextReducer = rootReducer();
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
