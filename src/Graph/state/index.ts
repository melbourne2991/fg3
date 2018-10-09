import { GraphASTState } from "./graphASTState";
import {
  INodeDefinitions,
  IGraphASTState,
  IGraphNode,
  IGraphPort
} from "./graphASTState/types";
import { RootState } from "../../types";
import { IGraphState, IDenormalizedGraphNode } from "../types";

export interface GraphStateUtils {
  getGraphState(state: RootState): IGraphState;
  getGraphASTState(state: RootState): IGraphASTState;
  createDefault(): IGraphState;
  denormalizeNodes(state: RootState): IDenormalizedGraphNode[];
}

export const createGraphStateUtils = (
  nodeDefinitions: INodeDefinitions
): GraphStateUtils => {
  const graphASTState = GraphASTState(nodeDefinitions);

  const getGraphState = (state: RootState) => state.present.graph;

  const getGraphASTState = R.pipe(
    getGraphState,
    R.prop<"graphAST">("graphAST")
  );

  const getDenormalizedNode = R.curry(
    (
      ports: Dict<IGraphPort>,
      node: IGraphNode<any, any>
    ): IDenormalizedGraphNode => {
      return {
        id: node.id,
        definition: nodeDefinitions[node.definition],
        inputs: node.inputIds.map(inputId => ports[inputId]),
        outputs: node.outputIds.map(outputId => ports[outputId])
      };
    }
  );

  const denormalizeNodes = (state: RootState) => {
    const { nodeIds, nodes, ports } = getGraphASTState(state);
    const denormalizeNode = getDenormalizedNode(ports);
    return nodeIds.map(nodeId => denormalizeNode(nodes[nodeId]));
  };

  return {
    denormalizeNodes,
    getGraphState,
    getGraphASTState,
    createDefault: () => {
      return {
        graphAST: graphASTState.createDefault(),
        metadata: {}
      };
    }
  };
};
