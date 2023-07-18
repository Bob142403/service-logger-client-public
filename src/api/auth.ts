import { request } from "./fetch/request";

const baseURL = "http://localhost:3000";

export const authApi = {
  auth: async () => await request(baseURL + "/auth"),
  login: async (body: any) =>
    await request(baseURL + "/login", {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json()),
  signUp: async (body: any) =>
    await request(baseURL + "/sign-up", {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json()),
};
