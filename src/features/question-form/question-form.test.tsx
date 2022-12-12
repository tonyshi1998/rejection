import { assert, render, screen } from "../../test/test-utils";
import QuestionForm from "./question-form";

const renderComponent = () => {
  render(<QuestionForm />);
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

describe("question-form", () => {
  assert({
    given: "a question form",
    should: "display a question input",
    test: () => {
      renderComponent();
      expect(screen.getByTestId("question-input")).toBeVisible();
    },
  });
  assert({
    given: "a question form",
    should: "display askee input",
    test: () => {
      renderComponent();
      expect(screen.getByTestId("askee-input")).toBeVisible();
    },
  });
  assert({
    given: "a question form",
    should: "display selection dropdown",
    test: () => {
      renderComponent();
      expect(screen.getByTestId("status-input")).toBeVisible();
    },
  });
  assert({
    given: "a question form",
    should: "display a submit button",
    test: () => {
      renderComponent();
      expect(screen.getByTestId("submit-input")).toBeVisible();
    },
  });
});
