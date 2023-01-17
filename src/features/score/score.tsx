import React, { Fragment, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { connect, ConnectedProps } from "react-redux";
import { selectScore } from "../questions/questions-reducer";

const mapStateToProps = (state: RootState) => ({
  score: selectScore(state),
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

export const Score = ({ score }: Props) => {
  return (
    <div className="mb-10 ml-2">
      <h1> Score: </h1>
      <div data-testid="score-value">{score}</div>
    </div>
  );
};

export default Container(Score);
