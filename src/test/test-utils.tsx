import {
  render as rtlRender,
  RenderOptions,
  screen,
} from "@testing-library/react";
import { queries, Queries } from "@testing-library/dom";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";
export { fireEvent, screen } from "@testing-library/react";
export function render<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  ui: React.ReactElement,
  options?: Omit<RenderOptions<Q, Container, BaseElement>, "wrapper">
) {
  function Wrapper({ children }: { children: JSX.Element }) {
    return <Provider store={makeStore()}>{children}</Provider>;
  }
  return rtlRender(ui, { ...options, wrapper: Wrapper });
}
export const assert = ({ given = "", should = "", test = () => {} }) => {
  return it(`given ${given}, should ${should}`, test);
};
