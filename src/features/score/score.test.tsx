import { assert, render, screen } from "../../test/test-utils";
import {Score} from "./score";

const renderComponent = (score = 42) => {
  render(<Score score={score}/>);
}

describe("score", () => {
  assert({
    given: "a score",
    should: "display a score",
    test: () => {
        const score = 10;
        renderComponent(score);

      expect(screen.getByTestId("score-value")).toHaveTextContent(score.toString())
    },
  });


});