import { request } from "./fetch/request";

const baseURL = "http://localhost:3000/log";

export const logsApi = {
  getLogs: async () =>
    await request(baseURL + "/list").then((res) => res.json()),
};
