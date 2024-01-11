
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../admin/pages";

export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="dasboard" element={<AdminDashboard />} />
        <Route path="/*" element={<Navigate to="/admin/dasboard" />} />
      </Routes>
    </>
  );
};
