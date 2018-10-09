import {
  IGraphASTState,
  IGraphNode,
  INodeDefinitions,
  IGraphPort,
  IGraphPortType
} from "./types";
import uniqid = require("uniqid");
import { addNormalizedItem } from "../../../util";

export const GraphASTState = <NDS extends INodeDefinitions>(
  nodeDefinitions: NDS
) => {
  const nodesLens = R.lens<
    IGraphASTState,
    Dict<IGraphNode<any, any>>,
    IGraphASTState
  >(R.prop("nodes"), R.assoc("nodes"));

  const indexById = R.indexBy<WithId>(R.prop("id"));
  const getIds = R.map<{ id: string }, string>(R.prop("id"));

  const nodeIdsLens = R.lens<IGraphASTState, string[], IGraphASTState>(
    R.prop("nodeIds"),
    R.assoc("nodeIds")
  );

  const portsLens = R.lens<IGraphASTState, Dict<IGraphPort>, IGraphASTState>(
    R.prop("ports"),
    R.assoc("ports")
  );

  const create = R.always<IGraphASTState>({
    nodes: {},
    nodeIds: [],
    ports: {}
  });

  const createNode = <K extends keyof NDS>(
    id: string,
    definition: K,
    inputIds: string[],
    outputIds: string[]
  ): IGraphNode<NDS, K> => ({
    id,
    definition,
    inputIds,
    outputIds
  });

  const createPort = <K extends keyof NDS["inputs"] | keyof NDS["outputs"]>(
    nodeId: string,
    name: K,
    type: IGraphPortType
  ) => ({
    id: uniqid(),
    name,
    nodeId,
    type,
    connectedTo: null
  });

  const addToNodes = addNormalizedItem(nodesLens, nodeIdsLens);

  const addNode = <K extends keyof NDS>(definitionName: K) => {
    const nodeId = uniqid();
    const definition = nodeDefinitions[definitionName];

    const inputs = R.map(
      key => createPort(nodeId, key as keyof NDS["inputs"], "input"),
      R.keys(definition.inputs)
    );

    const outputs = R.map(
      key => createPort(nodeId, key as keyof NDS["outputs"], "output"),
      R.keys(definition.outputs)
    );

    const addPorts = R.over(
      portsLens,
      R.merge(indexById(R.concat(inputs, outputs)))
    );

    const node = createNode<K>(
      nodeId,
      definitionName,
      getIds(inputs),
      getIds(outputs)
    );

    return R.pipe(
      addPorts,
      addToNodes(node)
    );
  };

  const createDefault: () => IGraphASTState = R.pipe<any, any, any>(
    create,
    addNode("inputNumber"),
    addNode("inputNumber")
  );

  return {
    create,
    createDefault
  };
};
