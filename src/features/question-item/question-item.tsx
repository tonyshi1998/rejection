import React, { useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { connect, ConnectedProps } from "react-redux";
import {
  Question,
  QuestionStatus,
  selectScore,
} from "../questions/questions-reducer";

const mapStateToProps = (state: RootState, props: { question: Question }) => ({
  question: props.question,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateQuestion: (timestamp: number, status: QuestionStatus) => {},
});

const Container = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof Container>;

/*
Question {
    id: String;
    timestamp: number;
    question: string; // ok
    askee: string;
    status: Accepted | Rejected | Unanswered
}

*/

export const QuestionItem = ({ question, updateQuestion }: Props) => {
  const updateStatusHandler = (newStatus: QuestionStatus) => {};

  return (
    <tr className="text-center">
      <td data-testid="question-content">{question.question}</td>

      <td className="flex justify-center" data-testid="question-status">
        {question.status}
      </td >
      <td data-testid="question-askee">{question.askee}</td>
      <td data-testid="actions">
        <button
          className="mr-2"
          onClick={() => updateStatusHandler(QuestionStatus.Accepted)}
        >
          Accept
        </button>
        <button onClick={() => updateStatusHandler(QuestionStatus.Rejected)}>
          Reject
        </button>
      </td>
    </tr>
  );
};

export default Container(QuestionItem);
