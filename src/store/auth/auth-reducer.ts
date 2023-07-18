import { createSlice } from "@reduxjs/toolkit";
import Auth from "../../types/Auth";

interface AuthState {
  auth: Auth;
}

const initialState: AuthState = {
  auth: { id: 0, firstName: "", lastName: "", email: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
