import * as React from "react";
import { default as h } from "react-hyperscript";
import { connect } from "react-redux";
import { RootState } from "../../types";
import { Canvas } from "./Canvas";
import { GraphStateUtils } from "../state";
import { GraphNode } from "./GraphNode";
import { IDenormalizedGraphNode } from "../types";
import { NodeLayoutCache } from "./GraphNode/NodeLayoutCache";

export interface GraphComponentProps {}

interface StateProps {
  nodes: IDenormalizedGraphNode[];
}
interface DispatchProps {}

type InternalProps = GraphComponentProps & StateProps & DispatchProps;

export function createGraphComponent(
  GraphStateUtils: GraphStateUtils
): React.ComponentType {
  class GraphComponent extends React.Component<InternalProps & StateProps> {
    private layoutCache: NodeLayoutCache = new NodeLayoutCache();

    private mapNode = (node: IDenormalizedGraphNode) => {
      const nodeLayout = this.layoutCache.getLayout({
        inputPortCount: node.inputs.length,
        outputPortCount: node.outputs.length
      });

      return h(GraphNode, { node, nodeLayout, key: node.id });
    };

    render() {
      const nodes = this.props.nodes.map(this.mapNode);

      return h(Canvas, nodes);
    }
  }
  const mapDispatchToProps = () => ({});

  const mapStateToProps = (state: RootState) => {
    return {
      nodes: GraphStateUtils.denormalizeNodes(state)
    };
  };

  return connect<StateProps, DispatchProps, GraphComponentProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  )(GraphComponent);
}
