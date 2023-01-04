import { assert, render, screen } from "../../test/test-utils";
import { Question } from "../questions/questions-reducer";
import { createQuestion } from "../test/test-factories";
import questionItem, { QuestionItem } from "./question-item";

const renderComponent = (question: Question) => {
  render(<QuestionItem question={question}></QuestionItem>);
};

describe("question-item", () => {
  const question = createQuestion();

  assert({
    given: "A question",
    should: "display the question",
    test: () => {
      renderComponent(question);
      const container = screen.getByTestId("question-content");
      expect(container).toHaveTextContent(question.question);
    },
  });

  assert({
    given: "A question",
    should: "display the actions",
    test: () => {
      renderComponent(question);
      const container = screen.getByTestId("actions");
      expect(container).toBeVisible();
    },
  });
});
