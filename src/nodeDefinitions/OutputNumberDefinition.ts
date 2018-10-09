import { INodeDefinition } from "../core/NodeDefinition";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export interface OutputNumberDefinitionInputs {
  value: Observable<never>;
}

export interface OutputNumberDefinitionOutputs {
  display: Observable<number>;
}

export interface OutputNumberDefinitionState {
  value: number | null;
}

type IOutputNumberDefinition = INodeDefinition<
  OutputNumberDefinitionInputs,
  OutputNumberDefinitionOutputs,
  OutputNumberDefinitionState
>;

export const OutputNumberDefinition: IOutputNumberDefinition = {
  label: "Number output",

  initialState: {
    value: null
  },

  inputs: {
    value: {
      label: "value"
    }
  },

  outputs: {
    display: {
      internal: true
    }
  },

  link: (inputs, state, setState) => {
    return {
      display: inputs.value.pipe(tap(value => setState({ value })))
    };
  }
};
