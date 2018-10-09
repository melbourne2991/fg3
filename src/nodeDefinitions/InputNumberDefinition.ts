import { INodeDefinition } from "../core/NodeDefinition";
import { Observable } from "rxjs";
import { mapTo } from "rxjs/operators";

export interface InputNumberDefinitionInputs {
  empty: Observable<never>;
}

export interface InputNumberDefinitionOutputs {
  value: Observable<number>;
}

export interface InputNumberDefinitionState {
  value: number;
}

type IInputNumberDefinition = INodeDefinition<
  InputNumberDefinitionInputs,
  InputNumberDefinitionOutputs,
  InputNumberDefinitionState
>;

export const InputNumberDefinition: IInputNumberDefinition = {
  label: "Number input",

  initialState: {
    value: 10
  },

  inputs: {
    empty: {
      internal: true
    }
  },

  outputs: {
    value: {
      label: "Number"
    }
  },

  link: (inputs, state) => {
    return {
      value: inputs.empty.pipe(mapTo(state.value))
    };
  }
};
