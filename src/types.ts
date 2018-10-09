import { StateWithHistory } from "redux-undo";
import { IGraphState } from "./Graph";

export type RootState = StateWithHistory<{ graph: IGraphState }>;
