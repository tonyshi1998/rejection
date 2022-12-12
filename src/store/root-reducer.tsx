import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/auth-reducer";
import questionsReducer from "../features/questions/questions-reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  questions: questionsReducer,
});

export default rootReducer;
