import { INodeDefinition } from "../../../core/NodeDefinition";

export type IGraphNodeIO<
  NDS extends INodeDefinitions,
  K extends keyof NDS,
  T extends keyof NDS[K]
> = { [IK in keyof NDS[K][T]]: string };

export interface IGraphNode<NDS extends INodeDefinitions, K extends keyof NDS>
  extends WithId {
  definition: K;
  inputIds: string[];
  outputIds: string[];
}

export type IGraphPortType = "input" | "output";

export interface IGraphPort<T extends IGraphPortType = any> extends WithId {
  nodeId: string;
  name: string;
  type: T;
  connectedTo: null | string;
}

export interface IGraphASTState<NDS extends INodeDefinitions = any> {
  nodes: Dict<IGraphNode<NDS, any>>;
  ports: Dict<IGraphPort>;

  nodeIds: string[];
}

export type INodeDefinitions = Dict<INodeDefinition<any, any, any>>;
