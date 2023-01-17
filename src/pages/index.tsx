import { useDispatch, useSelector } from "react-redux";
import { AuthActions, selectIsLogged } from "../features/auth/auth-reducer";
import { initializeFb } from "../features/firebase/firebase";
import QuestionForm from "../features/question-form/question-form";
import QuestionsList from "../features/questions-list/questions-list";
import Score from "../features/score/score";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect } from "react";

const firebase = initializeFb();
const auth = getAuth(firebase);

// createUserWithEmailAndPassword(auth, email, password)\
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     .then(() => {
//       .then() => {
//         .then() => {
//       }
//     })
//     .catch
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

export const HomePage = () => {
  // is this page connected to redux?
  const isLogged = useSelector(selectIsLogged);

  useEffect(
    () => {
      if (typeof window === 'undefined') return;

      window.firebase = firebase;
      window.auth = auth;

    }, []
  )

  const authenticate = async () => {
    const email = window.prompt("what is your email?");
    const password = window.prompt("what is your password?");

    if (!email || !password) {
      return;
    }

    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      debugger;
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {

        try{
          const signInResult =  await signInWithEmailAndPassword(auth, email, password)
        }catch(signInError: any){
          window.alert(signInError.message)
        }
        signInWithEmailAndPassword(auth, email, password)
      }
    }
  };

  return (
    <div className="">
      <button onClick={authenticate}> Sign In </button>
      <div data-testid="title" className="ml-2">
        <h1>Rejection App!</h1>
      </div>
      <QuestionForm></QuestionForm>
      <Score />
      <QuestionsList></QuestionsList>
    </div>
  );
};

export default HomePage;
