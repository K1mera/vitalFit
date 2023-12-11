import { Navigate, Route, Routes, useLocation } from "react-router-dom";


import { AppRouter } from './';

export const MainRouter = ({items,filter,allItems}) => {
  return (
    <Routes>
      {/* rutas para generales */}
      <Route path="/*" element={<AppRouter items={items} filter={filter} allItems={allItems}/>} />
      {/* rutas para login */}
      <Route path="/auth" element={"cambiar por el login comp"} />
      {/* rutas para admin  */}
      <Route path="/admin" element={"cambiar por el login comp"} />
    </Routes>
  );
}
