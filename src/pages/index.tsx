import { useDispatch, useSelector } from "react-redux";
import { selectIsLogged } from "../features/auth/auth-reducer";
import {
  getFbAuth,
  getFbFirestore
} from "../features/firebase/firebase";
import QuestionForm from "../features/question-form/question-form";
import QuestionsList from "../features/questions-list/questions-list";
import Score from "../features/score/score";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Question, questionsActions } from "../features/questions/questions-reducer";


const auth = getFbAuth();
const db = getFbFirestore();

export const HomePage = () => {
  // is this page connected to redux?
  const isLogged = useSelector(selectIsLogged);
  const dispatch = useDispatch();

  const [currentUser, updateCurrentUser] = useState<any>(null);

  const asyncRead = async () => {
    if (!db) return
    const querySnapshot = await getDocs(collection(db, "questions"));


    // from this firebase snapshot, extract all the items
    // and dispatch an action to add all the questions to the store
    const questions = querySnapshot.docs.map((doc) => {
      const question = doc.data() as Question;
      return question;
    });

    dispatch(questionsActions.updateQuestions({ questions }));



    // debugger
    // const questionArray = [] // questions
    // querySnapshot.forEach((doc) => { 
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   const question = doc.data() as Question;
    //   //dispatch(questionsActions.addQuestion({question}))
    //   questionArray.push(question)
    // }

    // // questions => [aaddress]

    // questions = [3, 4];
    // questions = [1, 2]

    // questions.pop();
    // questions.pop();
    // questions.push(1)
    // questions.push(2)
    
  };

  useEffect(() => {
    asyncRead()

  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    //window.firebase = firebase;
    //window.auth = auth;
  }, []);

  useEffect(() => {
    if (!auth) return;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateCurrentUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        updateCurrentUser(null);
        // User is signed out
        // ...
      }
    });
  }, []);

  const onSignOut = async () => {
    if (!auth) {
      return;
    }
    signOut(auth);
  };

  /*
    when the app loads
    reads all questions from the user and update it in the store
  */

  const authenticate = async () => {
    const email = window.prompt("what is your email?");
    const password = window.prompt("what is your password?");

    if (!email || !password) {
      return;
    }

    try {
      //otheremail@email.com; 123456
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        try {
          const signInResult = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
        } catch (signInError: any) {
          window.alert(signInError.message);
        }
        signInWithEmailAndPassword(auth, email, password);
      }
      return;
    }
  };

  return (
    <div className="">
      <div>
        {/* 
        if the user is authenticated, show a signOu button and the user's email address
        if not, show the signin in button
         */}
        {currentUser && (
          <div>
            {currentUser.email}
            <button className="ml-2" onClick={onSignOut}>
              {" "}
              Sign Out{" "}
            </button>
          </div>
        )}
        {!currentUser && <button onClick={authenticate}> Sign In </button>}
      </div>
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
