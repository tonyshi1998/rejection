import { makeStore } from "../../store/store";
import { assert } from "../../test/test-utils";
import {
  Question,
  questionsActions,
  QuestionStatus,
  selectQuestions,
} from "./questions-reducer";

// const QUESTION: Question = {
//   status: QuestionStatus.Unanswered,
//   question: "Does it snow on Mars?",
//   askee: "Elon Musk",
//   timestamp: 1234567,
// };

// const SECOND_QUESTION: Question = {
//   status: QuestionStatus.Unanswered,
//   question: "Does it rain on Mars?",
//   askee: "Elon Musk",
//   timestamp: 9876543,
// };

const createQuestion = (
  {
    status,
    question,
    askee,
    timestamp,
  }: {
    status?: QuestionStatus;
    question?: string;
    askee?: string;
    timestamp?: number;
  } = {
    status: QuestionStatus.Accepted,
    question: "question",
    askee: "askee",
    timestamp: Math.random() * 1e6,
  }
) =>
  ({
    status,
    question,
    askee,
    timestamp,
  } as Question);

// const question = createQuestion();
// const question2 = createQuestion({status: QuestionStatus.Rejected})

describe("questions-reducer", () => {
  assert({
    given: "A question that is rejected",
    should: "Add rejection to question state",
    test: () => {
      const store = makeStore();
      const question = createQuestion();
      store.dispatch(questionsActions.addQuestion({ question }));

      //questionsActions.addQuestion
      //

      const questions = selectQuestions(store.getState());

      expect(questions).toMatchObject([question]);
    },
  });
  assert({
    given: "A question and an existing non-empty state",
    should: "add question to existing state",
    test: () => {
      const store = makeStore();
      const question = createQuestion();
      const question2 = createQuestion();
      store.dispatch(questionsActions.addQuestion({ question }));

      store.dispatch(questionsActions.addQuestion({ question: question2 }));

      const questions = selectQuestions(store.getState());
      expect(questions).toMatchObject([question, question2]);
    },
  });
  assert({
    given: "A non-empty state and a question to be removed",
    should: "remove the question",
    test: () => {
      const store = makeStore();
      const question = createQuestion();
      const question2 = createQuestion();

      store.dispatch(questionsActions.addQuestion({ question }));
      store.dispatch(questionsActions.addQuestion({ question: question2 }));

      store.dispatch(
        questionsActions.removeQuestion({ timestamp: question.timestamp })
      );
      const questions = selectQuestions(store.getState());
      expect(questions).toMatchObject([question2]);
    },
  });
  assert({
    given: "non-empty state and action to clean state",
    should: "Remove all questions",
    test: () => {
      const store = makeStore();
      const question = createQuestion();
      const question2 = createQuestion();
      store.dispatch(questionsActions.addQuestion({ question }));
      store.dispatch(questionsActions.addQuestion({ question: question2 }));

      store.dispatch(questionsActions.reset());
      const questions = selectQuestions(store.getState());
      expect(questions).toMatchObject([]);
    },
  });
});
