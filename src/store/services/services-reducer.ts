import { createSlice } from "@reduxjs/toolkit";
import Service from "../../types/Service";

interface ServiceState {
  services: Service[];
}

const initialState: ServiceState = {
  services: [],
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices(state, action) {
      state.services = action.payload;
    },
  },
});

export const { setServices } = serviceSlice.actions;

export default serviceSlice.reducer;
