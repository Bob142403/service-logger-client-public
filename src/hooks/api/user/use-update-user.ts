import { useMutation } from "react-query";
import { userApi } from "../../../api/user";

function useUpdateUser() {
  return useMutation(async (body: any) => {
    return await userApi.updateUserById(body, body.id);
  });
}

export default useUpdateUser;
