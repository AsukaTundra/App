import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useNav = () => {
  const navigate = useNavigate();
  return navigate;
};
