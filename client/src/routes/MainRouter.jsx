import { Navigate, Route, Routes, useLocation } from "react-router-dom";


import { AppRouter } from './';
import { useDispatch } from "react-redux";
import {useEffect} from "react";
import {getProducts} from "../store/slices";

export const MainRouter = ({items,filter,allItems}) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts( allItems ))

  }, [])
  

  return (
    <Routes>
      {/* rutas para generales */}
      <Route path="/*" element={<AppRouter />} />
      {/* rutas para login */}
      <Route path="/auth" element={"cambiar por el login comp"} />
      {/* rutas para admin  */}
      <Route path="/admin" element={"cambiar por el login comp"} />
    </Routes>
  );
}
