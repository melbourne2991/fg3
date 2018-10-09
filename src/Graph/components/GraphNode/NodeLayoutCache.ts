import yoga from "yoga-layout";

import {
  ICompiledLayout,
  ILayoutMap,
  createStylesApplier,
  createLayout,
  YL
} from "../../../util/yogaLayoutUtils";

export interface INodeLayoutParams {
  inputPortCount: number;
  outputPortCount: number;
}

export interface INodeLayout {}

const layoutStylesheet = {
  node: {
    setWidth: 200,
    setHeightAuto: undefined
  },
  port: {
    setWidth: 20,
    setHeight: 20
  },
  row: {
    setPadding: [yoga.EDGE_ALL, 15],
    setFlexDirection: yoga.FLEX_DIRECTION_ROW
  },
  lcol: {
    setWidthPercent: 50,
    setPadding: [yoga.EDGE_ALL, 3],
    setHeightAuto: undefined,
    setAlignItems: yoga.ALIGN_FLEX_START
  },
  rcol: {
    setWidthPercent: 50,
    setPadding: [yoga.EDGE_ALL, 3],
    setHeightAuto: undefined,
    setAlignItems: yoga.ALIGN_FLEX_END
  }
};

const stylesApplier = createStylesApplier(layoutStylesheet);

export class NodeLayoutCache {
  cache: Map<string, INodeLayout>;

  constructor() {
    this.cache = new Map();
  }

  private buildLayout = (layoutParams: INodeLayoutParams): ICompiledLayout => {
    const rowCount = Math.max(
      layoutParams.inputPortCount,
      layoutParams.outputPortCount
    );

    const rowNodes: ILayoutMap[] = [];

    const makeRowNode = (): ILayoutMap =>
      YL("row", [YL("lcol", [YL("port")]), YL("rcol", [YL("port")])]);

    R.times(() => rowNodes.push(makeRowNode()), rowCount);

    return createLayout(YL("node", rowNodes), stylesApplier);
  };

  getLayout(layoutParams: INodeLayoutParams): ICompiledLayout {
    const key = JSON.stringify(layoutParams);

    if (this.cache.has(key)) {
      return this.cache.get(key) as ICompiledLayout;
    }

    const layout = this.buildLayout(layoutParams);
    this.cache.set(key, layout);

    return layout;
  }
}
