import { INodeDefinitions } from "./state/graphASTState/types";
import { createGraphStateUtils } from "./state";
import { graphReducer } from "./reducers";
import { createGraphComponent } from "./components";

export function createGraph(nodeDefinitions: INodeDefinitions) {
  const GraphStateUtils = createGraphStateUtils(nodeDefinitions);
  const Graph = createGraphComponent(GraphStateUtils);

  return {
    GraphStateUtils,
    Graph,
    graphReducer
  };
}

export * from "./types";
