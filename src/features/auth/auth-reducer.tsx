/* TDD (Test Driven Development)
=
you write the test before the code

advantages:
- makes the development process more like the scientific approach
- reduces bug density in a team from 30% to 80%
- increases your development speed by 30% in the long term
- it gives you documentation
- instant feedback (which eliminates fear of change)
- teaches you how to write more modular code
+ if you see famous developers like (Kent C. Dodd) you're going to notice they use TDD as well


problem:
- in the beginning you MAY think that you're going slower. But you're actually going faster

*/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type User = {
  email: string;
  name: string;
};
type AuthState = {
  user?: User;
  isLoading: boolean;
};
const initialState: AuthState = {
  isLoading: true,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      const { payload } = action;
      state.user = payload.user;
    },
    logout: () => {
      return initialState;
    },
  },
});
const AuthReducer = authSlice.reducer;
export default AuthReducer;
export const AuthActions = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
//export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectIsLogged = (state: RootState) => !!state.auth.user;
