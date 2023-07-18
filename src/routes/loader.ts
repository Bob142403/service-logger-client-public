import { redirect } from "react-router";
import { authApi } from "../api/auth";

export const loader = async () => {
  const response = await authApi.auth();

  if (!response.ok) return redirect("/login");

  const auth = await response.json();

  return auth;
};
