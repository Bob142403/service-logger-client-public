import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./services/services-reducer";
import logsReducer from "./logs/logs-reducer";
import authReducer from "./auth/auth-reducer";

export const store = configureStore({
  reducer: { service: servicesReducer, log: logsReducer, auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
