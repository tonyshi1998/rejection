import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export enum QuestionStatus {
  Accepted = "accepted",
  Rejected = "rejected",
  Unanswered = "unanswered",
}

// export type QuestionStatus = "Accepted" |  "Rejected"

export type Question = {
  status: QuestionStatus;
  question: string;
  askee: string;
  timestamp: number;
};

export type questionsState = {
  questions: Question[];
};

const initialState: questionsState = {
  questions: [],
};

export const slice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<{ question: Question }>) => {
      const { question } = action.payload;
      // const newState = {
      //     questions: [...state.questions, question]
      // };
      // return newState;
      state.questions.push(question);
      //   return newState;
    },
    removeQuestion: (state, action: PayloadAction<{ timestamp: number }>) => {
      const { timestamp } = action.payload;
      state.questions = state.questions.filter(
        (question) => question.timestamp !== timestamp
      );
    },
    reset: () => {
      return initialState;
    },
    updateStatus: (
      state,
      action: PayloadAction<{
        questionTimestamp: number;
        newStatus: QuestionStatus;
      }>
    ) => {
      const { questionTimestamp, newStatus } = action.payload;
      // "" => ``
      // {} => ${}
      console.log(`recieved questionTimestamp ${questionTimestamp} and newStatus ${newStatus}`)
      state.questions = state.questions.map((question) =>
        question.timestamp === questionTimestamp
          ? { ...question, status: newStatus }
          : question
      );

      console.log(state.questions)
    },
  },
});

const questionsReducer = slice.reducer;
export default questionsReducer;

export const questionsActions = slice.actions;

// export const {
//     updateIsOpen,
//     addQuestion,
//     NEWONE
// }
//  = slice.actions;
export const selectQuestions = (state: RootState) => state.questions.questions;

const getQuestionScore = (question: Question) => {
  switch (question.status) {
    case QuestionStatus.Accepted:
      return 1;
    case QuestionStatus.Rejected:
      return 10;
    default:
      return 0;
  }
};

// const initialValue = 0;
// const sumWithInitial = array1.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   initialValue
// );

export const selectScore = (state: RootState) => {
  // imperative programming solution
  // let score = 0
  // const questions = state.questions.questions
  // for (var i = 0; i < questions.length; i++) {
  //   score += getQuestionScore(questions[i])
  // }
  // return score

  // functional programming solution

  // some advantages:
  // less code
  // simpler code
  // easier to compose with other functions
  return state.questions.questions.reduce(
    (sum, item) => sum + getQuestionScore(item),
    0
  );
};

/// [1, 2, 3] => map => []
