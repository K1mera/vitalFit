import { Navigate, Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../admin/pages";
import EditProduct from "../admin/components/inventario/editProduct/editProduct";
import EditProduct2 from "../admin/components/inventario/editProduct/EditProduct2";

export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="dasboard" element={<AdminDashboard />} />
        <Route path="/*" element={<Navigate to="/dasboard" />} />
        <Route path="dasboard/editproduct/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
};
