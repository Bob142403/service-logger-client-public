import { useMutation } from "react-query";
import { authApi } from "../../../api/auth";
import { useNavigate } from "react-router";

function useSignUp() {
  const navigate = useNavigate();
  return useMutation(async (body: any) => {
    return await authApi
      .signUp(body)
      .then(() => navigate("/login"))
      .catch((err) => {});
  });
}

export default useSignUp;
