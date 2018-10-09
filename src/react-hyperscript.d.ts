// Type definitions for react-hyperscript 3.0
// Project: https://github.com/mlmorg/react-hyperscript
// Definitions by: tock203 <https://github.com/tock203>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module "react-hyperscript" {
  import {
    ComponentClass,
    StatelessComponent,
    ReactElement,
    Attributes
  } from "react";

  type Element = ReactElement<any> | string | number | null;

  function h(
    componentOrTag: ComponentClass | StatelessComponent | string,
    children?: ReadonlyArray<Element> | Element
  ): ReactElement<any>;

  function h<P extends { [attr: string]: any }>(
    componentOrTag: ComponentClass<P> | StatelessComponent<P> | string,
    properties: Attributes & P,
    children?: ReadonlyArray<Element> | Element
  ): ReactElement<P>;

  export default h;
}
