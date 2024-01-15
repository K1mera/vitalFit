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

 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  return (
    <Routes>

      { user.role === "admin" ?
        <Route path="/*" element={<AdminRoutes />} /> :
        <Route path="/*" element={<AppRouter />} />
      }

      {status !== "online" && (
        <>
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<AppRouter />} />
        </>
      )}
    </Routes>
  );
};
