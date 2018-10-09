export interface IMetadataNode {
  position: Point;
  dragging: boolean;
  selected: boolean;
}

export interface IMetadataState {
  nodes: {};
  connections: [string, string][];
  newConnection: {};
}
