import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/auth-reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;
