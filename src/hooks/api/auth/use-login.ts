import { useMutation } from "react-query";
import { authApi } from "../../../api/auth";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

function useLogin() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  return useMutation(async (values: any) => {
    await authApi
      .login(values)
      .then((res) => {
        cookies.set("token", res.token);
        navigate("/log");
      })
      .catch((err) => {});
  });
}

export default useLogin;
