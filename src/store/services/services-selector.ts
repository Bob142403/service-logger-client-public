import { RootState } from "../store";

export const getServices = (state: RootState) => state.service.services;

export const getServicesForSelector = (state: RootState) =>
  state.service.services.map((service) => {
    console.log(service);
    return {
      label: service.name,
      value: service.id,
    };
  });
