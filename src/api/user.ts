import { request } from "./service";

const baseURL = "http://localhost:3000/user";

export const userApi = {
  updateUserById: async (body: any, id: number) =>
    await request(baseURL + `/update-user/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
};
