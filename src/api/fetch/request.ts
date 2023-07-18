import Cookies from "universal-cookie";

const cookies = new Cookies();

export const request = (url: string, options?: RequestInit) =>
  fetch(url, {
    ...options,
    headers: {
      Authorization: cookies.get("token"),
      "Content-type": "application/json",
    },
  });
