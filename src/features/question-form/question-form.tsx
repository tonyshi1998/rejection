import React, { useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { connect, ConnectedProps } from "react-redux";
import { Question, questionsActions, QuestionStatus } from "../questions/questions-reducer";

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addQuestion: (question: Question) => dispatch(questionsActions.addQuestion({question}))
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

export const QuestionForm = ({addQuestion}: Props) => {
  const [question, setQuestion] = useState("");
  const [askee, setAskee] = useState("");
  const [status, setStatus] = useState("");

  const submitHander = (e) => {
    e.preventDefault();
   
    if (!question || !askee) return;

    // add the question to the store and firebase

    questionsActions.

    addQuestion({
      question,
      askee,
      status: QuestionStatus.Rejected,
      timestamp: new Date().getTime()

    })
    setQuestion('')
    setAskee('')
    setStatus(QuestionStatus.Unanswered)

  };

  return (
    <form onSubmit={submitHander} className="p-2 mr-2 mt-5 mb-10 border border-black ml-2 justify-content: center">
      <div className=" mt-2">
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
      <input data-testid="submit-input" type="submit" value="Sumbit" className="mt-2 p-2 bg-green-500"></input>
    </form>
  );
};

export default Container(QuestionForm);
