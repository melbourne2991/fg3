import * as R from "ramda";
(window as any).R = R;

import { configureStore } from "./configureStore";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { default as h } from "react-hyperscript";
import { createGraph } from "./Graph";
import { nodeDefinitions } from "./nodeDefinitions";

const { GraphStateUtils, Graph, graphReducer } = createGraph(nodeDefinitions);

const store = configureStore({ GraphStateUtils, graphReducer });

const rootNode = h(
  Provider,
  {
    store
  },
  h(Graph, {})
);

render(rootNode, document.getElementById("root"));
