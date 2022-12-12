import { assert, render, screen } from "../test/test-utils";
import HomePage from "./index";

const renderComponent = () => {
  render(<HomePage />);
};

// describe("HomePage", () => {
//   assert({
//     given: "a home page", // what is the context?
//     should: "display a hello world", // what should happen?
//     test: () => {
//       renderComponent();
//       expect(screen.getByTestId("title")).toBeVisible();
//       // actual test
//     },
//   });
// });

describe("HomePage", () => {
  assert({
    given: "any home page",
    should: "Display a title",
    test: () => {
      renderComponent();
      expect(screen.getByTestId("title")).toBeVisible();
    },
  });
});
