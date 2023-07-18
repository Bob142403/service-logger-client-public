import { request } from "./fetch/request";
const baseURL = "http://localhost:3000/service";

export const serviceApi = {
  getServices: async () =>
    await request(baseURL + "/list").then((res) => res.json()),
  updateServiceById: async (body: any, id: number) =>
    await request(baseURL + `/update-service/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteSeerviceById: async (id: number) =>
    await request(baseURL + `/delete-service/${id}`, {
      method: "DELETE",
    }),
  createService: async (body: any) =>
    await request(baseURL + "/create-service", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
export { request };
