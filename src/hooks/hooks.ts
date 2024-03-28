import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useNav = () => {
  const navigate = useNavigate();
  return navigate;
};

export async function Request<R, P>(method: string, url: string, headers?: { token?: string, json?: boolean }, body?: P): Promise<R | string> {
  let response;

  if (body || headers) {
    const options = {
      method: method,
      headers: {
        Authorization: headers?.token ? `Token ${headers.token}` : "",
        "Content-Type": headers?.json ? "application/json" : "",
      },
      body: body ? JSON.stringify(body) : null,
    };
    response = await fetch(url, options);
  } else {
    response = await fetch(url);
  }

  if (response.ok) {
    return response.json();
  } else if (response.status === 404) {
    return "Not Found";
  } else if (response.status === 422) {
    return "422";
  } else if (response.status === 401) {
    return "Unauthorized";
  } else {
    return "Server error, try again later";
  }
}
