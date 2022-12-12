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
