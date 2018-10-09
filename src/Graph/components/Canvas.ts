import * as React from "react";
import styled from "react-emotion";

import { pure } from "recompose";
import h from "react-hyperscript";

const StyledWrapper = styled("div")({
  width: "100%",
  height: "100%"
});

const StyledRootSvg = styled("svg")({
  display: "inline",
  width: "100%",
  height: "100%"
});

export const Canvas: React.ComponentType = pure(({ children }) => {
  return h(StyledWrapper, [
    h(StyledRootSvg, {
      children
    })
  ]);
});
