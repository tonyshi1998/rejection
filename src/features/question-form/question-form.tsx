import React, { useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => ({});

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

export const QuestionForm = ({}: Props) => {
  const [question, setQuestion] = useState("");
  const [askee, setAskee] = useState("");
  const [status, setStatus] = useState("");

  const submitHander = (e) => {
    e.preventDefault();
    console.log("form info:");
    console.log(question);
    console.log(askee);
    console.log(status);
  };

  return (
    <form onSubmit={submitHander}>
      <div>
        <label>Question</label>
        <input
          data-testid="question-input"
          className="border border-black ml-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <label>Askee</label>
        <input
          data-testid="askee-input"
          className="border border-black ml-2"
          value={askee}
          onChange={(e) => setAskee(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <label>Status</label>
        <select
          name="Status"
          data-testid="status-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>
      </div>
      <input data-testid="submit-input" type="submit" value="Sumbit"></input>
    </form>
  );
};

export default Container(QuestionForm);
