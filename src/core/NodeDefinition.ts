export interface INodeUIProps<State> {
  state: State;
  setState(state: State): void;
}

export interface IIOData {
  label?: string;
  internal?: boolean;
}

export interface INodeDefinition<I, O, State = {}> {
  label: string;

  initialState: State;

  inputs: { [K in keyof I]: IIOData };
  outputs: { [K in keyof O]: IIOData };

  component?: React.ComponentType<INodeUIProps<State>>;

  link(inputs: I, state: State, setState: (state: State) => void): O;
}
