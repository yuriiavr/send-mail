import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "../redux/auth/slice";
import { logoutUser } from "../redux/auth/operations";
import { useCallback } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isRefreshing, user } = useSelector(selectUserState);
  const logout = useCallback(() => {
    dispatch(logoutUser);
  }, [dispatch]);

  return { isLoggedIn, isRefreshing, user, logout };
};
