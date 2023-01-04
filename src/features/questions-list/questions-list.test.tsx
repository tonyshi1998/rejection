import { assert, render, screen } from "../../test/test-utils";
import { Question } from "../questions/questions-reducer";
import { createQuestion } from "../test/test-factories";
import {QuestionsList} from "./questions-list";


const renderComponent = (questions : Array<Question>) => {
  render(<QuestionsList questions={questions}/>);
}

describe("questions-list", () => {
  const questions = [createQuestion(), createQuestion()]

  assert({
    given: "A state with questions",
    should: "display the questions",
    test: () => {
      renderComponent(questions);
    const container = screen.getByTestId('questions-list')
    const elements = Array.from(container.querySelectorAll('div[data-timestamp]'));
    elements.forEach((item, index) => {
        expect(item.getAttribute('data-timestamp')).toBe(questions[index].timestamp.toString())
    })
    },
  })
});
