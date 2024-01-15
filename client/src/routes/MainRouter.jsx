import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AppRouter, AuthRoutes } from "./";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories, getProducts } from "../store/slices";

import { useSelector } from "react-redux";
import { AdminRoutes } from "./AdminRoutes";
import { Home } from "../pages";

export const MainRouter = () => {
  const { status, user } = useSelector((state) => state.auth);

  // console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  return (
    <Routes>
      {status === "online" && <Route path="/*" element={<AppRouter />} />}
      {status !== "online" && (
        <>
          <Route path="auth/*" element={<AuthRoutes />} />
          {user.role === "admin" && (
            <Route path="admin/*" element={<AdminRoutes />} />
          )}
          {status !== "admin" && <Route path="/*" element={<AppRouter />} />}
        </>
      )}
    </Routes>
  );
};
