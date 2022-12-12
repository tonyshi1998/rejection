import { useDispatch, useSelector } from "react-redux";
import { AuthActions, selectIsLogged } from "../features/auth/auth-reducer";
import QuestionForm from "../features/question-form/question-form";

export const HomePage = () => {
  // is this page connected to redux?
  const isLogged = useSelector(selectIsLogged);

  return (
    <div className="">
      <div data-testid="title">
        <h1>Rejection App!</h1>
      </div>
      <QuestionForm></QuestionForm>
    </div>
  );
};

export default HomePage;
