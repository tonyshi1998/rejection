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
