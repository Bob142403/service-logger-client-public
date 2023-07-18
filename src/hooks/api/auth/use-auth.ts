import { useMutation } from "react-query";
import { authApi } from "../../../api/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/auth/auth-reducer";

export function useAuth() {
  const dispatch = useDispatch();
  return useMutation(async () => {
    const auth = await authApi.auth().then((res) => res.json());
    dispatch(setAuth(auth));
    return auth;
  });
}
