import { IMetadataState } from "./types";

export const create = R.always<IMetadataState>({
  nodes: {},
  connections: [],
  newConnection: {}
});

export const MetadataState = {
  create
};
