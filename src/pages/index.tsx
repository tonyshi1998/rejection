import { useDispatch, useSelector } from "react-redux";
import { AuthActions, selectIsLogged } from "../features/auth/auth-reducer";
import QuestionForm from "../features/question-form/question-form";
import QuestionsList from "../features/questions-list/questions-list";
import Score from "../features/score/score";

export const HomePage = () => {
  // is this page connected to redux?
  const isLogged = useSelector(selectIsLogged);

  return (
    <div className="">
      <div data-testid="title">
        <h1>Rejection App!</h1>
      </div>
      <QuestionForm></QuestionForm>
      <Score />
      <QuestionsList></QuestionsList>
    </div>
  );
};

export default HomePage;
