import { IGraphASTState, IGraphPort } from "./state/graphASTState/types";
import { INodeDefinition } from "../core/NodeDefinition";

export interface IDenormalizedGraphNode extends WithId {
  definition: INodeDefinition<any, any, any>;
  inputs: IGraphPort<"input">[];
  outputs: IGraphPort<"output">[];
}

export interface IGraphState {
  graphAST: IGraphASTState;
  metadata: {};
}
