import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AppRouter } from "./";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories, getProducts } from "../store/slices";

import { useSelector } from "react-redux";
import { AdminRoutes } from "./AdminRoutes";

export const MainRouter = () => {
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Routes>
      {status === "admin" ? (
        <Route path="admin/*" element={<AdminRoutes />} />
      ) : (
        <Route path="/*" element={<AppRouter />} />
      )}
    </Routes>
  );
};
