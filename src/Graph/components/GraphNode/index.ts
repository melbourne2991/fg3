import { pure } from "recompose";
import h from "react-hyperscript";
import { IDenormalizedGraphNode } from "../../types";
import {
  ICompiledLayout,
  childLayoutProps
} from "../../../util/yogaLayoutUtils";
import styled from "react-emotion";

export interface GraphNodeProps {
  node: IDenormalizedGraphNode;
  nodeLayout: ICompiledLayout;
}

const StyledNodeRect = styled("rect")({
  fill: "blue"
});

const StyledPortRect = styled("rect")({
  fill: "black"
});

const inputColIndex = 0;
const outputColIndex = 1;
const portIndex = 0;

const buildPorts = (arr, colIndex, getChildLayout) =>
  arr.map((io, rowIndex) => {
    const props = getChildLayout(rowIndex, colIndex, portIndex);

    return h(StyledPortRect, {
      ...props,
      key: io.id
    });
  });

export const GraphNode = pure<GraphNodeProps>(({ node, nodeLayout }) => {
  const getChildLayout = childLayoutProps(nodeLayout);

  console.log(nodeLayout);

  const nodeInputRects = buildPorts(node.inputs, inputColIndex, getChildLayout);

  const nodeOutputRects = buildPorts(
    node.outputs,
    outputColIndex,
    getChildLayout
  );

  return h("svg", [
    h(StyledNodeRect, {
      ...nodeLayout.props
    }),
    nodeInputRects,
    nodeOutputRects
  ]);
});
