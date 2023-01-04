import React, { useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { connect, ConnectedProps } from "react-redux";
import { selectQuestions, selectScore } from "../questions/questions-reducer";
import QuestionItem from "../question-item/question-item";

const mapStateToProps = (state: RootState) => ({
  questions: selectQuestions(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({});

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

export const QuestionsList = ({ questions }: Props) => {
  return (
    <div>
      <div className=" flex flex-row justify-between flex-wrap">
        <div>Question</div>
        <div>Status</div>
        <div>Askee</div>
      </div>
      <div data-testid="questions-list">
        {questions.map((question) => (
          <QuestionItem
            question={question}
            key={question.timestamp}
            data-timestamp={question.timestamp}
          ></QuestionItem>
          //<div key={question.timestamp} data-timestamp={question.timestamp}>{JSON.stringify(question)}</div>
        ))}
      </div>
    </div>
  );
};

export default Container(QuestionsList);
