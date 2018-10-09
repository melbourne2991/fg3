import yoga, { Node, YogaNode, Layout } from "yoga-layout";

export interface ILayoutMap<K extends LayoutStylesheet = any> {
  style: keyof K;
  children: ILayoutMap<K>[];
}

export type ICompiledLayout = {
  props: LayoutSVGProps;
  children?: ICompiledLayout[];
};

export type ApplyStylesFn = (node: YogaNode) => void;

export type LayoutProps = { [K in keyof YogaNode]?: any };

export type LayoutStylesheet = {
  [name: string]: LayoutProps;
};

export type StylesApplier<F> = { [K in keyof F]: ApplyStylesFn };

export interface LayoutSVGProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function mapLayoutToSVGProps(
  layout: Layout,
  parentPos: Point
): LayoutSVGProps {
  console.log(layout);

  return {
    x: parentPos.x + layout.left,
    y: parentPos.y + layout.top,
    width: layout.width,
    height: layout.height
  };
}

export function YL<K extends LayoutStylesheet>(
  style: keyof K,
  children?: ILayoutMap<K>[]
): ILayoutMap<K> {
  return {
    style,
    children: children || []
  };
}

export const childLayoutProps = (layout: ICompiledLayout) => (
  ...args: number[]
): LayoutSVGProps => {
  if (Array.isArray(args[0])) (args as any) = args[0];

  const arr = args.reduce<(string | number)[]>((acc, arg) => {
    acc.push("children", arg);
    return acc;
  }, []);

  arr.push("props");

  return R.path(arr, layout) as LayoutSVGProps;
};

export function createLayout<T extends LayoutStylesheet>(
  layoutMap: ILayoutMap<T>,
  stylesApplier: StylesApplier<T>
): ICompiledLayout {
  const nodes: YogaNode[] = [];

  const createAndStyleNodes = (layoutMap: ILayoutMap<T>): YogaNode => {
    const node = Node.createDefault();

    nodes.push(node);

    stylesApplier[layoutMap.style](node);

    layoutMap.children.forEach((child, i) => {
      (node as any).insertChild(createAndStyleNodes(child), i);
    });

    return node;
  };

  const rootNode = createAndStyleNodes(layoutMap);
  rootNode.calculateLayout();

  const compileLayouts = (
    layoutMap: ILayoutMap<T>,
    parentPos = { x: 0, y: 0 }
  ): ICompiledLayout => {
    const node = nodes.shift()!;

    const props = mapLayoutToSVGProps(node.getComputedLayout(), parentPos);

    return {
      props,
      children: layoutMap.children.map(child => {
        return compileLayouts(child, props);
      })
    };
  };

  return compileLayouts(layoutMap);
}

export function createStylesApplier<F extends LayoutStylesheet>(
  stylesheet: F
): StylesApplier<F> {
  return R.mapObjIndexed(val => {
    return createStyleFn(val);
  })(stylesheet) as any;
}

function createStyleFn(styles: LayoutProps): ApplyStylesFn {
  return (node: YogaNode) =>
    R.forEachObjIndexed((val, key) => {
      if (Array.isArray(val)) {
        return (node[key] as any)(...(val as any));
      }
      (node[key] as any)(val);
    })(styles);
}
