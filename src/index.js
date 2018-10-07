import { configureStotre } from "./configureStore";
import { Provider } from "react-redux";
import { render } from "react-dom";
import h from "react-hyperscript";
import { configureStore } from "./configureStore";

const RootNode = h(
  Provider,
  {
    store: configureStore()
  },
  h("div", "Hello")
);

render(RootNode, document.getElementById("root"));
